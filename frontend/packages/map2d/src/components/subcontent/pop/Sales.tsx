import "ol/ol.css";
import { useState } from "react";
import { useRecoilState } from "recoil";

import CustomSelect from "@src/components/ui/CustomSelect";
import { salesAnalysisConditionState } from "@src/stores/AnalysisCondition";
import { BUSINESS, MONTH, TEMP_EMD, TEMP_SGG, YEAR } from "@src/utils/analysis-constant";

/**
 * 매출현황 컴포넌트
 * 
 * @param analysisConditions 분석조건
 */
export const Sales = () => {
  
  // 분석조건 상태
  const [salesAnalysisCondition, setSalesAnalysisCondition] = useRecoilState(salesAnalysisConditionState);
  const { inputWkt, sgg, emd, year, month, business } = salesAnalysisCondition;

  const setInputWkt = (value: string) => setSalesAnalysisCondition({...salesAnalysisCondition, inputWkt: value});
  const setSgg = (value: string) => setSalesAnalysisCondition({...salesAnalysisCondition, sgg: value});
  const setEmd = (value: string) => setSalesAnalysisCondition({...salesAnalysisCondition, emd: value});
  const setYear = (value: number) => setSalesAnalysisCondition({...salesAnalysisCondition, year: value});
  const setMonth = (value: number) => setSalesAnalysisCondition({...salesAnalysisCondition, month: value});
  const setBusiness = (value: typeof salesAnalysisCondition['business']) => setSalesAnalysisCondition({...salesAnalysisCondition, business: value});

  const [areaType, setAreaType] = useState<string>('admin');

  // 이벤트 핸들러
  const handleAreaTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => setAreaType(e.target.value); 

  return (
    <div>
      <div className="information">
        <div className="title info-icon">매출현황</div>
        <div className="explanation">매출 현황 조회 및 데이터 시각화를 수행하는 서비스 입니다.</div>
      </div>

      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">영역 설정</div>
        <div className="analysis-content">
          <label className="custom-radio">
            <input type="radio" value="admin" name="option" checked={areaType === 'admin'} onChange={handleAreaTypeChange}/>
            <span className="radio-mark"></span> 행정구역
          </label>
          <label className="custom-radio">
            <input type="radio" value="user" name="option" checked={areaType === 'user'} onChange={handleAreaTypeChange}/>
            <span className="radio-mark"></span> 사용자영역
          </label>                                                   
        </div>
        {areaType === 'admin' && (  
          <div id="admin-area-select" className="clear-both search-condition mar-top-10">
            <div className="condition-list mar-left-13">                            
              <label>시군구</label>
              <CustomSelect options={Object.entries(TEMP_SGG)} selectedOptionState={[sgg, setSgg]} onSelect={(e) => setSgg(e)} />
            </div>    
            <div className="condition-list mar-left-13">                            
              <label>읍면동</label>
              <CustomSelect options={Object.entries(TEMP_EMD)} selectedOptionState={[emd, setEmd]} onSelect={(e) => setEmd(e)} />
            </div>                                  
          </div> 
        )}
        {areaType === 'user' && (
          <div id="user-area-select" className="clear-both condition-area mar-top-10">
            <div className="list-wrapper">      
              <button type="button" className="circle"></button>  
              <button type="button" className="square"></button> 
              <button type="button" className="pentagon"></button>  
            </div> 
            <div className="button-area">
              <button type="button" className="reset">초기화</button>
            </div>                        
          </div>
        )}
      </div>
    
      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">분석조건 설정 </div>
        <div className="search-condition">
          <div className="condition-list mar-left-13">
            <label>기간 선택</label>
            <CustomSelect options={Object.entries(YEAR)} selectedOptionState={[year, setYear]} onSelect={(e) => setYear(e)} />
            <CustomSelect options={Object.entries(MONTH)} selectedOptionState={[month, setMonth]} onSelect={(e) => setMonth(e)} />
          </div>
          <div className="condition-list mar-left-13">
            <label>항목 선택</label>
            <CustomSelect options={Object.entries(BUSINESS)} selectedOptionState={[business, setBusiness]} onSelect={(e) => setBusiness(e)} />
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
