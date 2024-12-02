import "ol/ol.css";
import { useState } from "react";

import { useRecoilState } from "recoil";
import { locationAnalysisConditionState } from "@src/stores/AnalysisCondition";

/**
 * 지점 분석 컴포넌트
 * 
 * @param analysisConditions 분석조건
 */
export const Location = () => {
  // 분석조건 상태
  const [locationAnalysisCondition, setLocationAnalysisCondition] = useRecoilState(locationAnalysisConditionState);
  const { inputWkt, startDate, endDate, weight } = locationAnalysisCondition;

  const setInputWkt = (value: string) => setLocationAnalysisCondition({...locationAnalysisCondition, inputWkt: value});
  const setStartDate = (value: string) => setLocationAnalysisCondition({...locationAnalysisCondition, startDate: value});
  const setEndDate = (value: string) => setLocationAnalysisCondition({...locationAnalysisCondition, endDate: value});
  const setWeight = (value: boolean) => setLocationAnalysisCondition({...locationAnalysisCondition, weight: value});

  const [timeType, setTimeType] = useState<string>('month');

  // 영역 타입 변경 함수
  const handleTimeTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeType(e.target.value);
  };  

  return (
    <div>
      <div className="information">
        <div className="title info-icon">지점분석</div>
        <div className="explanation">지점 분석 조회 및 데이터 시각화를 수행하는 서비스 입니다.</div>
      </div>

      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">영역 설정</div>
        <div className="analysis-content">
          <div className="button-wrapper">
            <button type="button" className="normal-button cancel">초기화</button>
            <button type="button" className="normal-button apply">지점 선택</button>
          </div>
        </div>
      </div>

      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">분석기간 설정</div>
        <div className="analysis-content ">
          <label className="custom-radio">
            <input type="radio" value="month" name="option" checked={timeType === "month"} onChange={handleTimeTypeChange}/>
            <span className="radio-mark"></span> 월
          </label>
          <label className="custom-radio">
            <input type="radio" value="day" name="option" checked={timeType === "day"} onChange={handleTimeTypeChange}/>
            <span className="radio-mark"></span> 일
          </label>                                                  
        </div>

        <div className="search-condition">
          <div className="condition-list mar-left-13">
            <label>시작{timeType === 'month' ? '월' : '일'}</label>
            <input type="date" value={startDate || ''} onChange={e => setStartDate(e.target.value)}/>
          </div>
          <div className="condition-list mar-left-13">
            <label>종료{timeType === 'month' ? '월' : '일'}</label>
            <input type="date" value={endDate || ''} onChange={e => setEndDate(e.target.value)}/>
          </div>
        </div>
      </div>

      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">부가정보 설정</div>
        <div className="search-condition">
          <div className="condition-list mar-left-13">
            <label style={{whiteSpace: 'nowrap'}}>
            <input type="checkbox" style={{marginRight: '10px'}} checked={weight} onChange={(e) => setWeight(e.target.checked)}/>
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
