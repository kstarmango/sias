import "ol/ol.css";
import Feature from "ol/Feature";
import WKT from "ol/format/WKT";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Circle, Geometry, Point } from "ol/geom";
import { useCallback, useContext, useEffect, useState } from "react";

import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";

import { FeatureLike } from "ol/Feature";
import VectorLayer from "ol/layer/Vector";
import {Style, Fill, Stroke, Text} from "ol/style";

import { AnalysisResultModalOpenState, festivalRevenueAnalysisConditionState } from "@src/stores/AnalysisCondition";
import { getFestivalListData, getFestivalYearList } from "@src/services/analyRequestApi";
import Draw from "ol/interaction/Draw";
import { FestivalRevenueAnalysisCondition } from "@src/types/analysis-condition";
import axios from "axios";
import { useMapContext } from "@src/context/MapContext";
import { getTitleLayer } from "@src/utils/mapUtils";

type Festival = {
  gid: number;
  title: string;
  x_coord: number;
  y_coord: number;
  host: string;
  startDate: string;
  endDate: string;
  yyyy: string;
  content: string;
  geom: string;
}

/**
 * 축제 매출 분석 컴포넌트
 * 
 * @param analysisConditions 분석조건
 */
export const FestivalRevenue = () => {
  // 분석조건 상태
  const [festivalRevenueAnalysisCondition, setFestivalRevenueAnalysisCondition] = useRecoilState(festivalRevenueAnalysisConditionState);
  const { startDate, endDate, radius, order } = festivalRevenueAnalysisCondition;
  const setAnalysisResultModalOpen = useSetRecoilState(AnalysisResultModalOpenState);

  const updateAnalysisCondition = useCallback((key: keyof typeof festivalRevenueAnalysisCondition, value: any) => 
    setFestivalRevenueAnalysisCondition(prev => ({...prev, [key]: value})),
    [festivalRevenueAnalysisCondition]
  );

  const [festival, setFestival] = useState<Festival>({ gid: 0, title: '', x_coord: 0, y_coord: 0, host: '', startDate: '', endDate: '', yyyy: '', content: '', geom: '' });
  const [festivalYear, setFestivalYear] = useState<string>('');
  const [timeType, setTimeType] = useState<string>('month');
  const [pointType, setPointType] = useState<string>('Festival');
  const [isSggInclude, setIsSggInclude] = useState<boolean>(false);
  const [isJeonnamInclude, setIsJeonnamInclude] = useState<boolean>(false);
  const [weight, setWeight] = useState<boolean>(false);

  const { map } = useMapContext();

  const { data: festivalListData } = getFestivalListData(festivalYear) as { data: Festival[] };
  const { data: festivalYearList } = getFestivalYearList() as { data: string[] };

  const testMinDate = '202301';
  const testMaxDate = '202409'; 

  const minDate = testMinDate.substring(0, 4) + '-' + testMinDate.substring(4);
  const maxDate = testMaxDate.substring(0, 4) + '-' + testMaxDate.substring(4);

  const handlePointTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPointType(e.target.value);
    // 축제 지점 초기화
    getTitleLayer(map,'analysisInput')?.getSource()?.clear();
    updateAnalysisCondition('radius', 100);
    setFestival({ gid: 0, title: '', x_coord: 0, y_coord: 0, host: '', startDate: '', endDate: '', yyyy: '', content: '', geom: '' });
  }

  const handleTimeTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateAnalysisCondition('startDate', '');
    updateAnalysisCondition('endDate', '');
    setTimeType(e.target.value); 
  };

  /**
   * 축제 선택 이벤트 핸들러
   * @param item 축제 정보
   */
  const handleFestivalChange = (festivalTitle: string) => {
    const item : Festival = festivalListData?.find(item => item.title === festivalTitle) as Festival;
    if(!map) return;

    const wktReader = new WKT();
    const point = wktReader.readGeometry(item.geom) as Point;
    const newPoint = new Feature({ 
      geometry: new Circle(
        point.getCoordinates(),
        radius || 100
      ) 
    });

    const analysisSource = getTitleLayer(map, 'analysisInput')?.getSource();
    analysisSource?.clear();
    analysisSource?.addFeature(newPoint);

    map.getView().setCenter(point.getCoordinates());
    map.getView().setZoom(14);

    const coordinates = point.getCoordinates();
    setFestivalRevenueAnalysisCondition(prev => ({
      ...prev,
      startDate: formatDateString(item.startDate),
      endDate: formatDateString(item.endDate),
      x_coord: coordinates[0], 
      y_coord: coordinates[1],
    }));
    
    setFestival(item);
  };

  /**
   * 버퍼 거리 변경 이벤트 핸들러
   * @param e 이벤트
   */
  const handleBufferChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newBuffer = Number(e.target.value);
    updateAnalysisCondition('radius', newBuffer);

    const wktReader = new WKT();
    // 축제 지점 좌표
    const pointCoordinates = festival.geom 
      ? (wktReader.readGeometry(festival.geom) as Point).getCoordinates()
      : (getTitleLayer(map, 'analysisInput')?.getSource()?.getFeatures()[0]?.getGeometry() as Circle).getCenter();

    if(pointCoordinates && newBuffer){
      const newPoint = new Feature({ 
        geometry: new Circle(pointCoordinates, newBuffer)
      });

      const inputLayer = getTitleLayer(map, 'analysisInput');
      inputLayer?.getSource()?.clear();
      inputLayer?.getSource()?.addFeature(newPoint);
    }
  }, [radius]);

  /**
   * 분석 실행 이벤트 핸들러
   */
  const handleAnalysis = () => {
    
    if(!startDate || !endDate) {
      alert('분석기간을 설정해주세요.');
      return;
    } else if(startDate > endDate) {
      alert('시작일이 종료일보다 클 수 없습니다.');
      return;
    }

    try {
      // 분석결과 초기화
      getTitleLayer(map, 'analysisInput')?.getSource()?.clear();
      getTitleLayer(map, 'festival_sales_all')?.getSource()?.clear();

      // start loading
      const data = {...festivalRevenueAnalysisCondition};
      data.startDate = data.startDate.replace(/-/g, '');
      data.endDate = data.endDate.replace(/-/g, '');

      if(map) fesitvalSalesAll(data);
    } catch (error) {
      console.error(error);
    } finally {
      // stop loading
    }
  };

  /**
   * 지점 선택 이벤트 핸들러
   */
  const selectSpatialPoint = () => {
    if(!map) return;

    const interactions = map.getInteractions().getArray();
    const drawInteractions = interactions.filter(interaction => interaction.get('title') === 'Draw') as Draw[];
    drawInteractions.forEach(interaction => map.removeInteraction(interaction));
    const analysisInputSource = getTitleLayer(map, 'analysisInput')?.getSource() as VectorSource<Feature<Geometry>>;

    const drawInteraction = new Draw({
      source: analysisInputSource,
      type: 'Circle',
    });
    drawInteraction.set('title', 'Draw');
    
    drawInteraction.on('drawstart', e => {
      analysisInputSource.clear();
    });

    drawInteraction.on('drawend', e => {
      const feature = e.feature;
      const radius = (feature?.getGeometry() as Circle)?.getRadius();
      if(radius) updateAnalysisCondition('radius', radius.toFixed(0));

      map.removeInteraction(drawInteraction);
    });   

    map.addInteraction(drawInteraction);
  }

  useEffect(() => {
    return () => {
      // 분석결과 초기화
      getTitleLayer(map, 'festival_revenue')?.getSource()?.clear();
      getTitleLayer(map, 'analysisInput')?.getSource()?.clear();
    }
  }, []);

  /**
   * 날짜 포맷 변경 함수
   * @param dateString 날짜 문자열
   * @returns 포맷 변경된 날짜 문자열
   */
  const formatDateString = (dateString: string) => {
    if (!dateString) return '';
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);

    if(day){
      setTimeType('date');
      return `${year}-${month}-${day}`;
    } else {
      setTimeType('month');
      return `${year}-${month}`;
    }
  }

  /** 축제 매출 분석 결과 시각화 - layerTitle: festival_sales_all */
  const fesitvalSalesAll = async (conditions: FestivalRevenueAnalysisCondition) => {

    try {
      const fetchFestivalSalesAllData = async () => {
        const geoserverUrl = '/geoserver/jn/ows';
        const { x_coord, y_coord, startDate, endDate, radius, order } = conditions;
        
        const params = new URLSearchParams({
          service: 'WFS',
          version: '1.1.0',
          request: 'GetFeature',
          typeName: 'jn:jn_festival_sales_age_all', 
          outputFormat: 'application/json',
          srs: 'EPSG:5186',
          viewparams: `x_coord:${x_coord};y_coord:${y_coord};start_date:${startDate};end_date:${endDate};radius:${radius};order:${order}`
        })
    
        const response = await axios.get(`${geoserverUrl}?${params.toString()}`);
        if(!response.data){
          throw new Error('네트워크 응답이 좋지 않습니다.')
        }
        return response.data;
      }

      const styleFunction = (features: Feature<Geometry>[], order:string) => {
        
        const dataList = features.map(feature => feature.getProperties()[order]);
        const colorList = [ 'rgba(255, 255, 178, 0.6)', 'rgba(254, 204, 92, 0.6)',
          'rgba(253, 141, 60, 0.6)', 'rgba(240, 59, 32, 0.6)', 'rgba(189, 0, 38, 0.6)' ];

        // 임시 5등분 처리
        function divideIntoQuintiles(numbers: number[]): number[][] {
          if (numbers.length === 0) return []
        
          const sortedNumbers = [...numbers].sort((a, b) => a - b)
          const quintiles: number[][] = []
        
          const quintileSize = Math.ceil(sortedNumbers.length / 5)
        
          for (let i = 0; i < 5; i++) {
            const start = i * quintileSize
            const end = start + quintileSize
            quintiles.push(sortedNumbers.slice(start, end))
          }
        
          return quintiles
        }

        const quintiles = divideIntoQuintiles(dataList);

        return (feature: FeatureLike) => {

          const index = quintiles.findIndex(arr => arr.includes(feature.getProperties()[order]));

          const fillStyle = new Style({
            fill: new Fill({ color: colorList[index] }),
            stroke: new Stroke({
              color: '#fff',
              width: 1,
            }),
          });

          const labelStyle = new Style({
            text: new Text({
              font: '15px Calibri,sans-serif',
              fill: new Fill({
                color: '#000',
              }),
              stroke: new Stroke({
                color: '#fff',
                width: 4,
              }),
              text: '총 매출: ' + Number(feature.getProperties()[order].toFixed(0)).toLocaleString('ko-KR') + '원' 
            }),
            zIndex: 2
          });

          return [labelStyle, fillStyle];
        }
      }

      fetchFestivalSalesAllData().then(data => {
        if(data.features.length === 0) {
          alert('분석 조건에 충족하는 분석 결과가 존재하지 않습니다.');
          return;
        }

        const featureReader = new GeoJSON();
        const features = featureReader.readFeatures(data) as Feature<Geometry>[];
        
        const vectorLayer = map?.getLayers().getArray().filter(lyr => lyr instanceof VectorLayer && lyr.get('title') === 'festival_revenue')[0] as VectorLayer<VectorSource<Feature<Geometry>>>;
        vectorLayer.getSource()?.clear();
        vectorLayer.getSource()?.addFeatures(features);
        vectorLayer.setStyle(styleFunction(features, conditions.order ));

        setAnalysisResultModalOpen({
          modalOpen: true,
          title: '축제 매출 분석 결과',
          data: data
        });

      }).catch(error => {
        console.error(error);
      })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="main-content">
      <div className="information">
        <div className="title info-icon">축제 매출 분석</div>
        <div className="explanation">축제 매출 분석 조회 및 데이터 시각화를 수행하는 서비스 입니다.</div>
      </div>

      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">지점 설정</div>
        <div className="analysis-content">
          <label className="custom-radio">
            <input type="radio" value="Festival" name="pointType" checked={pointType === "Festival"} onChange={handlePointTypeChange}/>
            <span className="radio-mark"></span> 축제
          </label>
          <label className="custom-radio">
            <input type="radio" value="User" name="pointType" checked={pointType === "User"} onChange={handlePointTypeChange}/>
            <span className="radio-mark"></span> 사용자 지정
          </label>
        </div>

        {pointType === 'Festival' && (
          <div className="search-condition">
            <div className="condition-list mar-left-13">
              <label>축제 년도</label>
              <select className="custom-select" value={festivalYear || ''} onChange={e => setFestivalYear(e.target.value)}>
                <option value={0}> 축제 년도 선택 </option>
                {festivalYearList && festivalYearList.map((obj, idx) => (
                  <option key={idx} value={obj['yyyy']}>{obj['yyyy']}</option>
                ))}
              </select>
            </div>
            <div className="condition-list mar-left-13">
              <label>축제</label>
              <select className="custom-select" value={festival.title} onChange={e => handleFestivalChange(e.target.value)}>
                {festivalYear ? 
                  <>
                    <option value={''}>축제 선택</option>
                    {festivalListData?.map((item, idx) => (
                      <option key={idx} value={item.title}>{item.title}</option>
                    ))}
                  </> 
                : <option value={''}>축제 년도를 선택해주세요.</option>}
              </select>
            </div>
            <div className="condition-list mar-left-13">
              <label>버퍼</label>
              <div>
                <input type="number" value={radius} onChange={handleBufferChange}/>
                <span style={{marginLeft: '15px'}}>m</span>
              </div>
            </div>
          </div>
        )}

        {pointType === 'User' && (
          <div className="search-condition">
            <div className="condition-list mar-left-13">
              <label>버퍼</label>
              <div>
                <input type="number" value={radius} onChange={handleBufferChange}/>
                <span style={{marginLeft: '15px'}}>m</span>
              </div>
            </div>
            <div className="button-wrapper">
              <button type="button" className="normal-button cancel" onClick={() => getTitleLayer(map, 'analysisInput')?.getSource()?.clear()}>초기화</button>
              <button type="button" className="normal-button apply" onClick={selectSpatialPoint}>지점선택</button>
            </div>
          </div>
        )}
      </div>

      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">분석기간 설정</div>
        <div className="analysis-content ">
          <label className="custom-radio">
            <input 
              type="radio" 
              value="month"
              name="timeType" 
              checked={timeType === "month"} 
              onChange={handleTimeTypeChange}
            />
            <span className="radio-mark"></span> 월
          </label>
          <label className="custom-radio">
            <input 
              type="radio" 
              value="date" 
              name="timeType" 
              checked={timeType === "date"} 
              onChange={handleTimeTypeChange}
            />
            <span className="radio-mark"></span> 일
          </label>                                                  
        </div>

        <div className="search-condition">
          <div className="condition-list mar-left-13">
            <label>시작{timeType === 'month' ? '월' : '일'}</label>
            <input 
              type={timeType} 
              value={startDate || ''}
              min={timeType === 'month' ?
                minDate :
                `${minDate}-01`}
              max={endDate ? endDate :
                timeType === 'month' ?
                    maxDate :
                    `${maxDate}-${new Date(Number(maxDate.substring(0,4)), Number(maxDate.substring(6,7)), 0).getDate()}`}
              onChange={e => updateAnalysisCondition('startDate', e.target.value)} 
            /> 
          </div>
          <div className="condition-list mar-left-13">
            <label>종료{timeType === 'month' ? '월' : '일'}</label>
            <input 
              type={timeType} 
              value={endDate || ''} 
              min={startDate ?
                startDate :
                timeType === 'month' ?
                    minDate :
                    `${minDate}-01`}
              max={timeType === 'month' ?
                  maxDate :
                  `${maxDate}-${new Date(Number(maxDate.substring(0,4)), Number(maxDate.substring(6,7)), 0).getDate()}`}  
              onChange={e => updateAnalysisCondition('endDate', e.target.value)} 
            />
          </div>
        </div>
      </div>

      <div className="button-large-wrapper">
        <button type="button" className="large-button apply" onClick={handleAnalysis}>
          <span className="txt">조회</span>
        </button>
      </div>
    </div>
  );
}
