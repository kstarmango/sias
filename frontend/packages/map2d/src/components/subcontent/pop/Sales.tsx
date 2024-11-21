import "ol/ol.css";
import { useState } from "react";
import { AnalysisCondition } from "../../../types/analysis-condition";
import CustomSelect from "../../ui/CustomSelect";

/**
 * 매출현황 컴포넌트
 * 
 * @param analysisConditions 분석조건
 */
export const Sales = ({ analysisConditions }: { analysisConditions: AnalysisCondition }) => {
  // 분석조건 상태
  const [areaType, setAreaType] = useState<string>(analysisConditions.areaType);
  const [sgg, setSgg] = useState<string>(analysisConditions.sgg);
  const [emd, setEmd] = useState<string>(analysisConditions.emd);
  const [year, setYear] = useState<string>(analysisConditions.year);
  const [month, setMonth] = useState<string>(analysisConditions.month);
  const [business, setBusiness] = useState<string>(analysisConditions.business);


  // 이벤트 핸들러
  const handleAreaTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => setAreaType(e.target.value); 

  // 임시 데이터 목록
  const MONTH_LIST = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const YEAR_LIST = ['2024년', '2023년', '2022년', '2021년', '2020년', '2019년', '2018년', '2017년', '2016년', '2015년'];
  const TEMP_SGG_LIST = ['전체', '목포시', '여수시', '순천시', '완도군', '진도군'];
  const TEMP_EMD_LIST = ['전체', '금화동', '영산동', '중앙동', '중동', '중앙동'];
  // 국세청 표준산업분류 연계 업종 대분류 - 18종, 15종 확인후, 수정
  const BUSINESS_LIST = ['전체', '농업, 임업 및 어업', '광업', '제조업', '전기, 가스, 증기 및 공기 조절 공급업', '부동산업', '건설업', '사업시설 관리, 사업 지원 및 임대 서비스업', '수도, 하수 및 폐기물 처리, 원료 재생업', '도매 및 소매업', '예술, 스포츠 및 여가관련 서비스업', '교육서비스업', '정보통신업', '금융 및 보험업', '운수 및 창고업', '공공 행정, 국방 및 사회보장 행정', '숙박 및 음식점업', '전문, 과학 및 기술 서비스업', '협회 및 단체, 수리 및 기타 개인 서비스업'];

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
          <div className="condition-list mar-left-13">
            <label>항목 선택</label>
            <CustomSelect options={BUSINESS_LIST} selectedOptionState={[business, setBusiness]} onSelect={(e) => setBusiness(e)} />
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
