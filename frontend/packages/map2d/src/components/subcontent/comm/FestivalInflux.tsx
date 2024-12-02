import "ol/ol.css";
import { useState } from "react";
import { useRecoilState } from "recoil";

import CustomSelect from "@src/components/CustomSelect";
import { festivalInfluxAnalysisConditionState } from "@src/stores/AnalysisCondition";
import { TEMP_FESTIVAL, YEAR } from "@src/utils/analysis-constant";

/**
 * 축제 유입 분석 컴포넌트
 * 
 * @param analysisConditions 분석조건
 */
export const FestivalInflux = () => {
  // 분석조건 상태
  const [festivalInfluxAnalysisCondition, setFestivalInfluxAnalysisCondition] = useRecoilState(festivalInfluxAnalysisConditionState);
  const { inputWkt, festival, buffer, startDate, endDate, weight, isSggInclude } = festivalInfluxAnalysisCondition;

  const setInputWkt = (value: string) => setFestivalInfluxAnalysisCondition({...festivalInfluxAnalysisCondition, inputWkt: value});
  const setFestival = (value: string) => setFestivalInfluxAnalysisCondition({...festivalInfluxAnalysisCondition, festival: value});
  const setBuffer = (value: number) => setFestivalInfluxAnalysisCondition({...festivalInfluxAnalysisCondition, buffer: value});
  const setStartDate = (value: string) => setFestivalInfluxAnalysisCondition({...festivalInfluxAnalysisCondition, startDate: value});
  const setEndDate = (value: string) => setFestivalInfluxAnalysisCondition({...festivalInfluxAnalysisCondition, endDate: value});
  const setWeight = (value: boolean) => setFestivalInfluxAnalysisCondition({...festivalInfluxAnalysisCondition, weight: value});
  const setIsSggInclude = (value: boolean) => setFestivalInfluxAnalysisCondition({...festivalInfluxAnalysisCondition, isSggInclude: value});

  const [timeType, setTimeType] = useState<string>('month');
  const [pointType, setPointType] = useState<string>('Festival');

  const handlePointTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPointType(e.target.value);
  };
  const handleTimeTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeType(e.target.value);
  }; 

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
            <CustomSelect options={Object.entries(TEMP_FESTIVAL)} selectedOptionState={[festival, setFestival]} onSelect={(e) => setFestival(e)} />
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
            <CustomSelect options={Object.entries(YEAR)} selectedOptionState={[startDate, setStartDate]} onSelect={(e) => setStartDate(e)}/>
          </div>
          <div className="condition-list mar-left-13">
            <label>종료{timeType === 'month' ? '월' : '일'}</label>
            <CustomSelect options={Object.entries(YEAR)} selectedOptionState={[endDate, setEndDate]} onSelect={(e) => setEndDate(e)}/>
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
        <button type="button" className="large-button apply">
          <span className="txt">조회</span>
        </button>
      </div>
    </div>
  );
}
