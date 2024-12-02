import "ol/ol.css";
import { useState } from "react";
import { useRecoilState } from "recoil";

import { lifeVulnAnalysisConditionState } from "@src/stores/AnalysisCondition";
import { LifeVulnAnalysisCondition } from "@src/types/analysis-condition";
import { ANALYSIS_FAC, ANALYSIS_POP, ANALYSIS_POP_DETAIL } from "@src/utils/analysis-constant";

/**
 * 최단거리 시설 분석 컴포넌트
 * 
 * @param analysisConditions 분석조건
 */

export const LifeVulnArea = () => {

  // 분석조건 상태
  const [ lifeVulnAnalysisCondition, setLifeVulnAnalysisCondition ] = useRecoilState(lifeVulnAnalysisConditionState);
  const { inputWkt, sgg, emd, gwangju, lifeServiceFacility, popInclude, analysisPop } = lifeVulnAnalysisCondition;
  
  const [areaType, setAreaType] = useState<string>('point');
  const [analysisPopClassification, setAnalysisPopClassification] = useState<string[]>([]);

  const handleAreaTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => setAreaType(e.target.value); 

  // 분석조건 상태 설정 함수
  const setInputWkt = (value: string) => setLifeVulnAnalysisCondition({...lifeVulnAnalysisCondition, inputWkt: value});
  const setSgg = (value: string) => setLifeVulnAnalysisCondition({...lifeVulnAnalysisCondition, sgg: value});
  const setEmd = (value: string) => setLifeVulnAnalysisCondition({...lifeVulnAnalysisCondition, emd: value});
  const setGwangju = (value: boolean) => setLifeVulnAnalysisCondition({...lifeVulnAnalysisCondition, gwangju: value});
  const setLifeServiceFacility = (value: LifeVulnAnalysisCondition['lifeServiceFacility']) => setLifeVulnAnalysisCondition({...lifeVulnAnalysisCondition, lifeServiceFacility: value});
  const setPopInclude = (value: boolean) => setLifeVulnAnalysisCondition({...lifeVulnAnalysisCondition, popInclude: value});
  const setAnalysisPop = (value: string) => setLifeVulnAnalysisCondition({...lifeVulnAnalysisCondition, analysisPop: value});

  // 임시 데이터 목록
  const TEMP_SGG_LIST = ['전체', '목포시', '여수시', '순천시', '완도군', '진도군'];
  const TEMP_EMD_LIST = ['전체', '금화동', '영산동', '중앙동', '중동', '중앙동'];

  return (
    <div>
      <div className="information">
        <div className="title info-icon">서비스 취약지역</div>
        <div className="explanation">
          분석시설(학교, 어린이집, 문화시설, 소방서, 병원)으로 부터 접근성이 취약한 지역을 조회하고 특정지점으로 부터 대상지까지 네트워크 분석을 수행하는 서비스 입니다.
        </div>
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
              <select className="custom-select" value={sgg} onChange={e => setSgg(e.target.value)}>
                {TEMP_SGG_LIST.map((value, index) => (
                  <option key={index} value={value}>{value}</option>
                ))}
              </select>
            </div>    
            <div className="condition-list mar-left-13">                            
              <label>읍면동</label>
              <select className="custom-select" value={emd} onChange={e => setEmd(e.target.value)}>
                {TEMP_EMD_LIST.map((value, index) => (
                  <option key={index} value={value}>{value}</option>
                ))}
              </select>
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
        <div className="analysis-title">분석조건 설정</div>
        <div className="analysis-content search-condition">
          <div className="condition-list">
            <label>분석시설</label>
            <select className="custom-select" value={lifeServiceFacility} onChange={e => setLifeServiceFacility(e.target.value as LifeVulnAnalysisCondition['lifeServiceFacility'])}>
              {Object.entries(ANALYSIS_FAC).map(([key, value]) => (
                <option key={key} value={key}>{String(value)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">인구정보 설정</div>
        <div className="analysis-content search-condition">
          <label>
            <input type="checkbox" onChange={() => setPopInclude(!popInclude)} style={{marginRight: '10px'}}/>
            <span>인구 포함</span>
          </label>
        </div>
        {popInclude && (
          <div className="clear-both search-condition mar-top-10">
            <div className="condition-list mar-left-13">
              <label>분류</label>
              <select className="custom-select" value={analysisPop} onChange={e => setAnalysisPop(e.target.value)}>
                {Object.entries(ANALYSIS_POP).map(([key, value]) => (
                  <option key={key} value={key}>{String(value)}</option>
                ))}
              </select>
            </div>
            <div className="condition-list mar-left-13">
              <label>세부분류</label>
              <select className="custom-select" value={analysisPop} onChange={e => setAnalysisPop(e.target.value)}>
                {Object.entries(ANALYSIS_POP_DETAIL).map(([key, value]) => (
                  <option key={key} value={key}>{String(value)}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">부가정보 설정</div>
        <div className="analysis-content search-condition" >
          <label style={{whiteSpace: 'nowrap'}}>
            <input type="checkbox" onChange={() => setGwangju(!gwangju)} style={{marginRight: '10px'}}/>
            <span>광주광역시 포함</span>
          </label>
        </div>
      </div>
      <div className="button-large-wrapper">
        <button type="button" className="large-button apply">
          <span className="txt">분석</span>
        </button>
      </div>
    </div>
  );
}
