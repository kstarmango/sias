import "ol/ol.css";
import { useState } from "react";
import CustomSelect from "@src/components/CustomSelect";
import { useRecoilState } from "recoil";
import { commPopAnalysisConditionState } from "@src/stores/AnalysisCondition";
import { MONTH, TEMP_EMD, TEMP_SGG } from "@src/utils/analysis-constant";
import { YEAR } from "@src/utils/analysis-constant";

/**
 * 상권인구 분석 컴포넌트
 * 
 * @param analysisConditions 분석조건
 */
export const CommPop = () => {
  
  // 분석조건 상태
  const [commPopAnalysisCondition, setCommPopAnalysisCondition] = useRecoilState(commPopAnalysisConditionState);
  const { buffer, sgg, emd, startDate, endDate, weight } = commPopAnalysisCondition;

  const [areaType, setAreaType] = useState<string>('admin');
  const [timeType, setTimeType] = useState<string>('month');

  // 이벤트 핸들러
  const setBuffer = (value: number) => setCommPopAnalysisCondition({...commPopAnalysisCondition, buffer: value});
  const setSgg = (value: string) => setCommPopAnalysisCondition({...commPopAnalysisCondition, sgg: value});
  const setEmd = (value: string) => setCommPopAnalysisCondition({...commPopAnalysisCondition, emd: value});
  const setStartDate = (value: string) => setCommPopAnalysisCondition({...commPopAnalysisCondition, startDate: value});
  const setEndDate = (value: string) => setCommPopAnalysisCondition({...commPopAnalysisCondition, endDate: value});
  const setWeight = (value: boolean) => setCommPopAnalysisCondition({...commPopAnalysisCondition, weight: value});

  // 영역 타입 변경 함수
  const handleAreaTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAreaType(e.target.value);
  };
  const handleTimeTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeType(e.target.value);
  };  

  return (
    <div>
      <div className="information">
        <div className="title info-icon">상권 인구 분석</div>
        <div className="explanation">상권 인구 분석 및 데이터 시각화를 수행하는 서비스 입니다.</div>
      </div>

      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">영역 설정</div>
        <div className="analysis-content">
          <label className="custom-radio">
            <input type="radio" value="admin" name="areaType" checked={areaType === "admin"} onChange={handleAreaTypeChange}/>
            <span className="radio-mark"></span> 행정구역
          </label>
          <label className="custom-radio">
            <input type="radio" value="user" name="areaType" checked={areaType === "user"} onChange={handleAreaTypeChange}/>
            <span className="radio-mark"></span> 사용자 지정
          </label>                                                   
        </div>

        {areaType === 'admin' && (  
          <div className="clear-both search-condition mar-top-10">
            <div className="condition-list mar-left-13">                            
              <label>시군구</label>
              <CustomSelect options={Object.entries(TEMP_SGG)} selectedOptionState={[sgg, setSgg]} onSelect={(e) => setSgg(e)}/>
            </div>    
            <div className="condition-list mar-left-13">                            
              <label>읍면동</label>
              <CustomSelect options={Object.entries(TEMP_EMD)} selectedOptionState={[emd, setEmd]} onSelect={(e) => setEmd(e)}/>
            </div>                                  
          </div> 
        )}

        {areaType === 'user' && (
          <>
            <div className="clear-both condition-area mar-top-10">
              <div className="list-wrapper">      
                <button type="button" className="circle"></button>  
                <button type="button" className="square"></button> 
                <button type="button" className="pentagon"></button>  
              </div> 
              <div className="button-area">
                <button type="button" className="reset">초기화</button>
              </div>                        
            </div>
            <div className="search-condition mar-top-10">
              <div className="condition-list mar-left-13">                            
                <label>버퍼</label>
                <div className="input-wrapper">
                  <input type="text" value={buffer} onChange={(e) => setBuffer(Number(e.target.value))}/>
                  <span style={{marginLeft: '15px'}}>m</span>
                </div>
              </div>    
            </div>
          </>
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
          {timeType === "month" && (
            <div className="condition-list mar-left-13">
              <label>기간 선택</label>
              <CustomSelect options={Object.entries(YEAR)} selectedOptionState={[startDate, setStartDate]} onSelect={(e) => setStartDate(e)}/>
              <CustomSelect options={Object.entries(MONTH)} selectedOptionState={[endDate, setEndDate]} onSelect={(e) => setEndDate(e)}/>
            </div>
          )}
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
