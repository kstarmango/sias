import "ol/ol.css";
import Feature from "ol/Feature";
import WKT from "ol/format/WKT";
import { useRecoilState } from "recoil";
import { Circle, Point } from "ol/geom";
import { useCallback, useContext, useEffect, useState } from "react";

import { festivalInfluxAnalysisConditionState } from "@src/stores/AnalysisCondition";
import { getFestivalListData, getFestivalYearList } from "@src/services/festAnalyApi";
import { MapContext } from "@src/contexts/MapView2DContext";
import { odFlowMap } from "@src/services/analyVisualization";

type Festival = {
  gid: number;
  title: string;
  x_coord: number;
  y_coord: number;
  host: string;
  start_date: string;
  end_date: string;
  yyyy: string;
  content: string;
  geom: string;
}

/**
 * 축제 유입 분석 컴포넌트
 * 
 * @param analysisConditions 분석조건
 */
export const FestivalInflux = () => {
  // 분석조건 상태
  const [festivalInfluxAnalysisCondition, setFestivalInfluxAnalysisCondition] = useRecoilState(festivalInfluxAnalysisConditionState);
  const { start_date, end_date, radius } = festivalInfluxAnalysisCondition;

  const updateAnalysisCondition = (key: keyof typeof festivalInfluxAnalysisCondition, value: any) => 
    setFestivalInfluxAnalysisCondition({...festivalInfluxAnalysisCondition, [key]: value});

  const [festival, setFestival] = useState<Festival>({ gid: 0, title: '', x_coord: 0, y_coord: 0, host: '', start_date: '', end_date: '', yyyy: '', content: '', geom: '' });
  const [festivalYear, setFestivalYear] = useState<string>('');
  const [timeType, setTimeType] = useState<string>('month');
  const [pointType, setPointType] = useState<string>('Festival');
  const [isSggInclude, setIsSggInclude] = useState<boolean>(false);
  const [weight, setWeight] = useState<boolean>(false);

  const { map, getTitleLayer } = useContext(MapContext);

  const { data: festivalListData } = getFestivalListData(festivalYear) as { data: Festival[] };
  const { data: festivalYearList } = getFestivalYearList() as { data: string[] };

  const handlePointTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => setPointType(e.target.value);
  const handleTimeTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateAnalysisCondition('start_date', '');
    updateAnalysisCondition('end_date', '');
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

    const analysisSource = (getTitleLayer('analysisInput')?.getSource());
    analysisSource?.clear();
    analysisSource?.addFeature(newPoint);

    map.getView().setCenter(point.getCoordinates());
    map.getView().setZoom(14);

    const coordinates = point.getCoordinates();
    setFestivalInfluxAnalysisCondition({...festivalInfluxAnalysisCondition, x_coord: coordinates[0], y_coord: coordinates[1]});
    setFestival(item);
  };

  useEffect(() => {
    console.log(festivalInfluxAnalysisCondition.x_coord, festivalInfluxAnalysisCondition.y_coord);
  }, [festivalInfluxAnalysisCondition.x_coord, festivalInfluxAnalysisCondition.y_coord]);

  const handleBufferChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newBuffer = Number(e.target.value);
    updateAnalysisCondition('radius', newBuffer);

    const wktReader = new WKT();
    const point = wktReader.readGeometry(festival.geom) as Point;

    if(festival.geom && newBuffer){
      
      const newPoint = new Feature({ 
        geometry: new Circle(
          point.getCoordinates(),
          newBuffer
        )
      });

      const inputLayer = getTitleLayer('analysisInput');
      inputLayer?.getSource()?.clear();
      inputLayer?.getSource()?.addFeature(newPoint);
    }
  }, [festival.geom, radius]);

  /**
   * 분석 실행 이벤트 핸들러
   */
  const handleAnalysis = () => {

    if(!festival.geom) {
      alert('축제 지점을 선택해주세요.');
      return;
    } else if(!start_date || !end_date) {
      alert('분석기간을 설정해주세요.');
      return;
    } else if(start_date > end_date) {
      alert('시작일이 종료일보다 클 수 없습니다.');
      return;
    }

    try {
      // 분석결과 초기화
      getTitleLayer('analysisInput')?.getSource()?.clear();
      getTitleLayer('festival_inflow')?.getSource()?.clear();

      // start loading
      const data = {...festivalInfluxAnalysisCondition};
      data.start_date = data.start_date.replace(/-/g, '');
      data.end_date = data.end_date.replace(/-/g, '');

      if(map) odFlowMap(data, map);
    } catch (error) {
      console.error(error);
    } finally {
      // stop loading
    }
  };

  const selectSpatialPoint = () => {
    if(!map) return;

    
  }

  useEffect(() => {
    return () => {
      // 분석결과 초기화
      getTitleLayer('festival_inflow')?.getSource()?.clear();
      getTitleLayer('analysisInput')?.getSource()?.clear();
    }
  }, []);

  return (
    <div className="main-content">
      <div className="information">
        <div className="title info-icon">축제 유입 분석</div>
        <div className="explanation">축제 유입 분석 조회 및 데이터 시각화를 수행하는 서비스 입니다.</div>
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
                    {festivalListData?.map((item) => (
                      <option key={item.gid} value={item.title}>{item.title}</option>
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
              <button type="button" className="normal-button cancel" onClick={() => getTitleLayer('analysisInput')?.getSource()?.clear()}>초기화</button>
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
              value={start_date || ''}
              min={timeType === 'month' ? '2023-01' : '2023-01-01'}
              max={timeType === 'month' 
                ? `${new Date().getFullYear()}-${new Date().getMonth() + 1}` 
                : `${new Date().toISOString().split("T")[0]}`}
              onChange={e => updateAnalysisCondition('start_date', e.target.value)} 
            /> 
          </div>
          <div className="condition-list mar-left-13">
            <label>종료{timeType === 'month' ? '월' : '일'}</label>
            <input 
              type={timeType} 
              value={end_date || ''} 
              min={timeType === 'month' ? '2023-01' : '2023-01-01'}
              max={timeType === 'month' 
                ? `${new Date().getFullYear()}-${new Date().getMonth() + 1}` 
                : `${new Date().toISOString().split("T")[0]}`}
              onChange={e => updateAnalysisCondition('end_date', e.target.value)} 
            />
          </div>
        </div>
      </div>

      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">분석조건 설정</div>
        <div className="search-condition">
          <div className="condition-list mar-left-13">
            <label style={{whiteSpace: 'nowrap'}}>
              <input type="checkbox" checked={isSggInclude} onChange={(e) => setIsSggInclude(e.target.checked)} style={{marginRight: '10px'}}/>
              <span>현재 시군구 포함</span>
            </label>
          </div>
        </div>
      </div>

      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">부가정보 설정</div>
        <div className="search-condition">
          <div className="condition-list mar-left-13">
            <label style={{whiteSpace: 'nowrap'}}>
              <input type="checkbox" checked={weight} onChange={(e) => setWeight(e.target.checked)} style={{marginRight: '10px'}}/>
              <span>가중치 적용</span>
            </label>
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
