import "ol/ol.css";
import { useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { festivalInfluxAnalysisConditionState } from "@src/stores/AnalysisCondition";
import { YEAR } from "@src/utils/analysis-constant";
import { getFestivalListData } from "@src/services/festAnalyApi";
import { Point } from "ol/geom";
import Feature from "ol/Feature";
import { MapContext } from "@src/contexts/MapView2DContext";
import VectorLayer from "ol/layer/Vector";

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
}

/**
 * 축제 유입 분석 컴포넌트
 * 
 * @param analysisConditions 분석조건
 */
export const FestivalInflux = () => {
  // 분석조건 상태
  const [festivalInfluxAnalysisCondition, setFestivalInfluxAnalysisCondition] = useRecoilState(festivalInfluxAnalysisConditionState);
  const { inputWkt, buffer, startDate, endDate, weight, isSggInclude } = festivalInfluxAnalysisCondition;

  const updateAnalysisCondition = (key: keyof typeof festivalInfluxAnalysisCondition, value: any) => 
    setFestivalInfluxAnalysisCondition({...festivalInfluxAnalysisCondition, [key]: value});

  const [festival, setFestival] = useState<Festival>({ gid: 0, title: '', x_coord: 0, y_coord: 0, host: '', start_date: '', end_date: '', yyyy: '', content: ''});
  const [festivalYear, setFestivalYear] = useState<string>('');
  const [timeType, setTimeType] = useState<string>('month');
  const [pointType, setPointType] = useState<string>('Festival');
  const [festivalList, setFestivalList] = useState<any[]>([]);

  const { map } = useContext(MapContext);

  const handlePointTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => setPointType(e.target.value);
  const handleTimeTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => setTimeType(e.target.value); 

  /**
   * 축제 선택 이벤트 핸들러
   * @param item 축제 정보
   */
  const handleFestivalChange = (item: any) => {
    const { gid, title, x_coord, y_coord, ...rest } = item;

    if(!map) return;

    const newPoint = new Feature({ geometry: new Point([x_coord, y_coord]) });
    const analysisSource = (map.getLayers().getArray().filter(layer => layer?.get('title') === 'analysisInput')[0] as VectorLayer)?.getSource();
    analysisSource?.clear();
    analysisSource?.addFeature(newPoint);

    map.getView().fit(newPoint.getGeometry() as Point, {
      padding: [1000, 1000, 1000, 1000],
    });
    const currentZoom = (map.getView().getZoom() || 28) - 14;
    map.getView().setZoom(currentZoom);

    setFestival(item.title);
  };

  const { data: festivalListData } = getFestivalListData(festivalYear);

  useEffect(() => {
    if(festivalListData){
      setFestivalList(festivalListData);
    }
  }, [festivalListData]);

  return (
    <div>
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
            <label>축제</label>
            <select className="custom-select" value={festival?.title || ''} onChange={e => handleFestivalChange(festivalList[Number(e.target.value)])}>
              {festivalList && festivalYear ? 
                festivalList.map((item, idx) => (
                  <option key={item.gid} value={idx}>{item.title}</option>
                ))
              : <option value={0}>축제 년도를 선택해주세요.</option>}
            </select>
          </div>
          <div className="condition-list mar-left-13">
            <label>버퍼</label>
            <div>
              <input type="text" value={buffer} onChange={(e) => updateAnalysisCondition('buffer', Number(e.target.value))}/>
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
                <input type="text" value={buffer} onChange={(e) => updateAnalysisCondition('buffer', Number(e.target.value))}/>
                <span style={{marginLeft: '15px'}}>m</span>
              </div>
            </div>
            <div className="button-wrapper">
              <button type="button" className="normal-button cancel">초기화</button>
              <button type="button" className="normal-button apply">지점선택</button>
            </div>
          </div>
        )}
      </div>

      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">분석기간 설정</div>
        <div className="analysis-content ">
          <label className="custom-radio">
            <input type="radio" value="month" name="timeType" checked={timeType === "month"} onChange={handleTimeTypeChange}/>
            <span className="radio-mark"></span> 월
          </label>
          <label className="custom-radio">
            <input type="radio" value="day" name="timeType" checked={timeType === "day"} onChange={handleTimeTypeChange}/>
            <span className="radio-mark"></span> 일
          </label>                                                  
        </div>

        <div className="search-condition">
          <div className="condition-list mar-left-13">
            <label>시작{timeType === 'month' ? '월' : '일'}</label>
            <select className="custom-select" value={startDate || ''} onChange={e => updateAnalysisCondition('startDate', e.target.value)}>
              {Object.entries(YEAR).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>
          <div className="condition-list mar-left-13">
            <label>종료{timeType === 'month' ? '월' : '일'}</label>
            <select className="custom-select" value={endDate || ''} onChange={e => updateAnalysisCondition('endDate', e.target.value)}>
              {Object.entries(YEAR).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">분석조건 설정</div>
        <div className="search-condition">
          <div className="condition-list mar-left-13">
            <label style={{whiteSpace: 'nowrap'}}>
              <input type="checkbox" checked={isSggInclude} onChange={(e) => updateAnalysisCondition('isSggInclude', e.target.checked)} style={{marginRight: '10px'}}/>
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
              <input type="checkbox" checked={weight} onChange={(e) => updateAnalysisCondition('weight', e.target.checked)} style={{marginRight: '10px'}}/>
              <span>가중치 적용</span>
            </label>
          </div>
        </div>
      </div>

      <div className="button-large-wrapper">
        <button type="button" className="large-button apply">
          <span className="txt">조회</span>
        </button>
      </div>
    </div>
  );
}
