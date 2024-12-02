import "ol/ol.css";
import { useState } from "react";
import { useRecoilState } from "recoil";

import { TEMP_FESTIVAL, YEAR } from "@src/utils/analysis-constant";
import { festivalRevenueAnalysisConditionState } from "@src/stores/AnalysisCondition";

/**
 * 축제 매출 분석 컴포넌트
 * 
 * @param analysisConditions 분석조건
 */
export const FestivalRevenue = () => {
  // 분석조건 상태
  const [festivalRevenueAnalysisCondition, setFestivalRevenueAnalysisCondition] = useRecoilState(festivalRevenueAnalysisConditionState);
  const { inputWkt, festival, buffer, startDate, endDate } = festivalRevenueAnalysisCondition;

  const setInputWkt = (value: string) => setFestivalRevenueAnalysisCondition({...festivalRevenueAnalysisCondition, inputWkt: value});
  const setFestival = (value: string) => setFestivalRevenueAnalysisCondition({...festivalRevenueAnalysisCondition, festival: value});
  const setBuffer = (value: number) => setFestivalRevenueAnalysisCondition({...festivalRevenueAnalysisCondition, buffer: value});
  const setStartDate = (value: string) => setFestivalRevenueAnalysisCondition({...festivalRevenueAnalysisCondition, startDate: value});
  const setEndDate = (value: string) => setFestivalRevenueAnalysisCondition({...festivalRevenueAnalysisCondition, endDate: value});

  const [pointType, setPointType] = useState<string>('Festival');
  const [timeType, setTimeType] = useState<string>('month');

  // 영역 타입 변경 함수
  const handlePointTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPointType(e.target.value);
  };
  const handleTimeTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeType(e.target.value);
  }; 

  return (
    <div>
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
            <label>축제</label>
            <select className="custom-select" value={festival} onChange={e => setFestival(e.target.value)}>
              {Object.entries(TEMP_FESTIVAL).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>
          <div className="condition-list mar-left-13">
            <label>버퍼</label>
            <div>
              <input type="text" value={buffer} onChange={(e) => setBuffer(Number(e.target.value))}/>
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
                <input type="text" value={buffer} onChange={(e) => setBuffer(Number(e.target.value))}/>
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
            <select className="custom-select" value={startDate || ''} onChange={e => setStartDate(e.target.value)}>
              {Object.entries(YEAR).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>
          <div className="condition-list mar-left-13">
            <label>종료{timeType === 'month' ? '월' : '일'}</label>
            <select className="custom-select" value={endDate || ''} onChange={e => setEndDate(e.target.value)}>
              {Object.entries(YEAR).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
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
