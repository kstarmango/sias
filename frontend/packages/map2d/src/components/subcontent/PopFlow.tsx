import "ol/ol.css";
import { useState } from "react";
import { AnalysisCondition } from "../../types/analysis-condition";
import CustomSelect from "../ui/CustomSelect";

/**
 * 유동인구현황 컴포넌트
 * 
 * @param analysisConditions 분석조건
 */
export const PopFlow = ({ analysisConditions }: { analysisConditions: AnalysisCondition }) => {
  // 분석조건 상태
  const [areaType, setAreaType] = useState<string>(analysisConditions.areaType);
  const [sgg, setSgg] = useState<string>(analysisConditions.sgg);
  const [emd, setEmd] = useState<string>(analysisConditions.emd);
  const [year, setYear] = useState<string>(analysisConditions.year);
  const [month, setMonth] = useState<string>(analysisConditions.month);

  // 이벤트 핸들러
  const handleAreaTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => setAreaType(e.target.value); 

  // 임시 데이터 목록
  const MONTH_LIST = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const YEAR_LIST = ['2024년', '2023년', '2022년', '2021년', '2020년', '2019년', '2018년', '2017년', '2016년', '2015년'];
  const TEMP_SGG_LIST = ['전체', '목포시', '여수시', '순천시', '완도군', '진도군'];
  const TEMP_EMD_LIST = ['전체', '금화동', '영산동', '중앙동', '중동', '중앙동'];

  return (
    <div>
      <div className="information">
        <div className="title info-icon">유동인구현황</div>
        <div className="explanation">유동인구 현황 조회 및 데이터 시각화를 수행하는 서비스 입니다.</div>
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
              <CustomSelect options={TEMP_SGG_LIST} selectedOptionState={[sgg, setSgg]} onSelect={(e) => setSgg(e)} />
            </div>    
            <div className="condition-list mar-left-13">                            
              <label>읍면동</label>
              <CustomSelect options={TEMP_EMD_LIST} selectedOptionState={[emd, setEmd]} onSelect={(e) => setEmd(e)} />
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
            <CustomSelect options={YEAR_LIST} selectedOptionState={[year, setYear]} onSelect={(e) => setYear(e)} />
            <CustomSelect options={MONTH_LIST} selectedOptionState={[month, setMonth]} onSelect={(e) => setMonth(e)} />
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
