import "ol/ol.css";
import { useState } from "react";
import CustomSelect from "@src/components/ui/CustomSelect";


/**
 * 상권인구 분석 컴포넌트
 * 
 * @param analysisConditions 분석조건
 */
export const CommPop = () => {
  // 분석조건 상태
  const [areaType, setAreaType] = useState<string>('admin');
  const [timeType, setTimeType] = useState<string>('month');
  const [buffer, setBuffer] = useState<string>('100');

  const [sgg, setSgg] = useState<string>('');
  const [emd, setEmd] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [month, setMonth] = useState<string>('');

  // 영역 타입 변경 함수
  const handleAreaTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAreaType(e.target.value);
  };
  const handleTimeTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeType(e.target.value);
  };  

  // 임시 데이터 목록
  const MONTH_LIST = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const YEAR_LIST = ['2024년', '2023년', '2022년', '2021년', '2020년', '2019년', '2018년', '2017년', '2016년', '2015년'];
  const TEMP_SGG_LIST = ['전체', '목포시', '여수시', '순천시', '완도군', '진도군'];
  const TEMP_EMD_LIST = ['전체', '금화동', '영산동', '중앙동', '중동', '중앙동'];

  return (
    <div>
      <div className="information">
        <div className="title info-icon">상권 인구현황</div>
        <div className="explanation">유입인구 현황 조회 및 데이터 시각화를 수행하는 서비스 입니다.</div>
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
              <CustomSelect options={TEMP_SGG_LIST} selectedOptionState={[sgg, setSgg]} onSelect={(e) => setSgg(e)}/>
            </div>    
            <div className="condition-list mar-left-13">                            
              <label>읍면동</label>
              <CustomSelect options={TEMP_EMD_LIST} selectedOptionState={[emd, setEmd]} onSelect={(e) => setEmd(e)}/>
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
                  <input type="text" value={buffer} onChange={(e) => setBuffer(e.target.value)}/>
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
              <CustomSelect options={YEAR_LIST} selectedOptionState={[year, setYear]} onSelect={(e) => setYear(e)}/>
              <CustomSelect options={MONTH_LIST} selectedOptionState={[month, setMonth]} onSelect={(e) => setMonth(e)}/>
            </div>
          )}
        </div>
      </div>

      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">부가정보 설정</div>
        <div className="search-condition">
          <div className="condition-list mar-left-13">
            <label style={{whiteSpace: 'nowrap'}}>
            <input type="checkbox" style={{marginRight: '10px'}}/>
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
