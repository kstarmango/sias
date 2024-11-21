import "ol/ol.css";
import { useState } from "react";
import { AnalysisCondition } from "../../../types/analysis-condition";
import CustomSelect from "@src/components/ui/CustomSelect";


/**
 * 축제 유입 분석 컴포넌트
 * 
 * @param analysisConditions 분석조건
 */
export const FestivalInflux = ({ analysisConditions }: { analysisConditions: AnalysisCondition }) => {
  // 분석조건 상태
  const [timeType, setTimeType] = useState<string>('month');
  const [year, setYear] = useState<string>('2024년');
  const [month, setMonth] = useState<string>('1월');
  const [pointType, setPointType] = useState<string>('Festival');
  const [festival, setFestival] = useState<string>('전체');
  const [buffer, setBuffer] = useState<string>('100');

  // 영역 타입 변경 함수
  const handlePointTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPointType(e.target.value);
  };
  const handleTimeTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeType(e.target.value);
  }; 

  // 임시 데이터 목록
  const MONTH_LIST = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const YEAR_LIST = ['2024년', '2023년', '2022년', '2021년', '2020년', '2019년', '2018년', '2017년', '2016년', '2015년'];
  const TEMP_FESTIVAL_LIST = ['전체', '목포문화축제', '여수문화축제', '순천문화축제', '완도문화축제', '진도문화축제'];

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
            <CustomSelect options={TEMP_FESTIVAL_LIST} selectedOptionState={[festival, setFestival]} onSelect={(e) => setFestival(e)} />
          </div>
          <div className="condition-list mar-left-13">
            <label>버퍼</label>
            <div>
              <input type="text" value={buffer} onChange={(e) => setBuffer(e.target.value)}/>
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
                <input type="text" value={buffer} onChange={(e) => setBuffer(e.target.value)}/>
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
            <CustomSelect options={YEAR_LIST} selectedOptionState={[year, setYear]} onSelect={(e) => setYear(e)}/>
          </div>
          <div className="condition-list mar-left-13">
            <label>종료{timeType === 'month' ? '월' : '일'}</label>
            <CustomSelect options={YEAR_LIST} selectedOptionState={[month, setMonth]} onSelect={(e) => setMonth(e)}/>
          </div>
        </div>
      </div>

      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">분석조건 설정</div>
        <div className="search-condition">
          <div className="condition-list mar-left-13">
            <label style={{whiteSpace: 'nowrap'}}>
              <input type="checkbox" style={{marginRight: '10px'}}/>
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
