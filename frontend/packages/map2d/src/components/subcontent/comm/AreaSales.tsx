import "ol/ol.css";
import { useState } from "react";
import { useRecoilState } from "recoil";

import { BUSINESS } from "@src/utils/analysis-constant";
import { AreaSalesAnalysisCondition } from "@src/types/analysis-condition";
import { areaSalesAnalysisConditionState } from "@src/stores/AnalysisCondition";

/**
 * 상권 매출 분석 컴포넌트
 * 
 * @param analysisConditions 분석조건
 */
export const AreaSales = () => {
  // 분석조건 상태
  const [areaType, setAreaType] = useState<string>('point');
  const [timeType, setTimeType] = useState<string>('month');
  const [areaSalesAnalysisCondition, setAreaSalesAnalysisCondition] = useRecoilState<AreaSalesAnalysisCondition>(areaSalesAnalysisConditionState);
  const { inputWkt, buffer, startDate, endDate, business } = areaSalesAnalysisCondition;

  // 그리기 상태
  const [areaShape, setAreaShape] = useState<string>('circle');

  // 분석조건 상태 변경 함수
  const setInputWkt = (value: string) => setAreaSalesAnalysisCondition({...areaSalesAnalysisCondition, inputWkt: value});
  const setBuffer = (value: number) => setAreaSalesAnalysisCondition({...areaSalesAnalysisCondition, buffer: value});
  const setStartDate = (value: string) => setAreaSalesAnalysisCondition({...areaSalesAnalysisCondition, startDate: value});
  const setEndDate = (value: string) => setAreaSalesAnalysisCondition({...areaSalesAnalysisCondition, endDate: value});
  const setBusiness = (value: AreaSalesAnalysisCondition['business']) => setAreaSalesAnalysisCondition({...areaSalesAnalysisCondition, business: value});

  // 영역 타입 변경 함수
  const handleAreaTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAreaType(e.target.value);
  };

  // 시간 타입 변경 함수
  const handleTimeTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeType(e.target.value);
  };
  
  return (
    <div>
      <div className="information">
        <div className="title info-icon">상권 매출 분석</div>
        <div className="explanation">상권 매출 분석 조회 및 데이터 시각화를 수행하는 서비스 입니다.</div>
      </div>

      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">영역 설정</div>
        <div className="search-condition">
          <div className="condition-list mar-left-13">
            <label className="custom-radio">
              <input type="radio" value="point" name="areaType" checked={areaType === "point"} onChange={handleAreaTypeChange}/>
              <span className="radio-mark"></span> 지점
            </label>
            <label className="custom-radio">
              <input type="radio" value="area" name="areaType" checked={areaType === "area"} onChange={handleAreaTypeChange}/>
              <span className="radio-mark"></span> 영역
            </label>   
          </div>

          {areaType === 'point' && (
            <>
              <div className="condition-list mar-left-13">                            
                <label>버퍼</label>
                <div>
                  <input type="number" value={buffer} onChange={e => setBuffer(parseInt(e.target.value))}/>
                  <span style={{marginLeft: '15px'}}>m</span>
                </div>
              </div> 

              <div className="clear-both condition-area mar-top-10">
                <div className="button-wrapper">
                  <button type="button" className="normal-button cancel">초기화</button>
                  <button type="button" className="normal-button apply">지점 선택</button>
                </div>
              </div>
            </>
          )}

          {areaType === 'area' && (
            <div className="clear-both condition-area mar-top-10">  
              <div className="list-wrapper">      
                <button type="button" className="circle" onClick={() => setAreaShape('circle')}></button>  
                <button type="button" className="square" onClick={() => setAreaShape('square')}></button> 
                <button type="button" className="pentagon" onClick={() => setAreaShape('pentagon')}></button>  
              </div> 
              <div className="button-area">
                <button type="button" className="reset">초기화</button>
              </div>
            </div>
          )}
        </div>
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
            <input 
              type="date" 
              value={startDate || ''} 
              onChange={e => setStartDate(e.target.value)}
            />
          </div>
          <div className="condition-list mar-left-13">
            <label>종료{timeType === 'month' ? '월' : '일'}</label>
            <input 
              type="date" 
              value={endDate || ''} 
              onChange={e => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">분석조건 설정</div>
        <div className="search-condition">
          <div className="condition-list mar-left-13">
            <label>항목 선택</label>
            <select className="custom-select" value={business} onChange={e => setBusiness(e.target.value as AreaSalesAnalysisCondition['business'])}>
              {Object.entries(BUSINESS).map(([key, value]) => (
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
