import "ol/ol.css";
import { useState } from "react";
import { AnalysisCondition } from "../../../types/analysis-condition";
import CustomSelect from "@src/components/ui/CustomSelect";


/**
 * 지점 분석 컴포넌트
 * 
 * @param analysisConditions 분석조건
 */
export const Location = ({ analysisConditions }: { analysisConditions: AnalysisCondition }) => {
  // 분석조건 상태
  const [areaType, setAreaType] = useState<string>('admin');
  const [timeType, setTimeType] = useState<string>('month');
  const [buffer, setBuffer] = useState<string>('100');

  const [sgg, setSgg] = useState<string>(analysisConditions.sgg);
  const [emd, setEmd] = useState<string>(analysisConditions.emd);
  const [year, setYear] = useState<string>(analysisConditions.year);
  const [month, setMonth] = useState<string>(analysisConditions.month);

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
            <CustomSelect options={YEAR_LIST} selectedOptionState={[year, setYear]} onSelect={(e) => setYear(e)}/>
          </div>
          <div className="condition-list mar-left-13">
            <label>종료{timeType === 'month' ? '월' : '일'}</label>
            <CustomSelect options={YEAR_LIST} selectedOptionState={[year, setYear]} onSelect={(e) => setYear(e)}/>
          </div>
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
