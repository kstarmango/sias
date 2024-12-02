import "ol/ol.css";
import { useRecoilState } from "recoil";

import { LifeAnalysisCondition } from "@src/types/analysis-condition";
import { lifeAnalysisConditionState } from "@src/stores/AnalysisCondition";
import { LIFE_SERVICE_FACILITY, LIFE_SERVICE_VISUAL, TEMP_SGG } from "@src/utils/analysis-constant";
import { TEMP_EMD } from "@src/utils/analysis-constant";

/**
 * 생활서비스 조회컴포넌트
 * 
 * @param analysisConditions 분석조건
 */
export const LifeService = () => {

  // 분석조건 상태
  const [ lifeAnalysisCondition, setLifeAnalysisCondition ] = useRecoilState(lifeAnalysisConditionState);
  const { sgg, emd, lifeServiceFacility, visualType } = lifeAnalysisCondition;

  const setSgg = (value: string) => setLifeAnalysisCondition({...lifeAnalysisCondition, sgg: value});
  const setEmd = (value: string) => setLifeAnalysisCondition({...lifeAnalysisCondition, emd: value});
  const setLifeServiceFacility = (value: LifeAnalysisCondition['lifeServiceFacility']) => setLifeAnalysisCondition({...lifeAnalysisCondition, lifeServiceFacility: value});
  const setVisualType = (value: LifeAnalysisCondition['visualType']) => setLifeAnalysisCondition({...lifeAnalysisCondition, visualType: value});

  return (
    <div>
      <div className="information">
        <div className="title info-icon">생활서비스</div>
        <div className="explanation">의료, 교육, 복지, 상업, 기타 생활서비스 데이터 조회 및 시각화를 수행하는 서비스 입니다.</div>
      </div>
      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">영역설정</div>
        <div className="analysis-content search-condition">
          <div className="condition-list mar-left-13">
            <label>시군구</label>
            <select className="custom-select" value={sgg} onChange={e => setSgg(e.target.value)}>
              {Object.entries(TEMP_SGG).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>
          <div className="condition-list mar-left-13">
            <label>읍면동</label>
            <select className="custom-select" value={emd} onChange={e => setEmd(e.target.value)}>
              {Object.entries(TEMP_EMD).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">분석조건 설정</div>
        <div className="analysis-content search-condition">
          <div className="condition-list mar-left-13">
            <label style={{whiteSpace: 'nowrap'}}>생활서비스 시설</label>
            <select className="custom-select" value={lifeServiceFacility} onChange={e => setLifeServiceFacility(e.target.value as LifeAnalysisCondition['lifeServiceFacility'])}>
              {Object.entries(LIFE_SERVICE_FACILITY).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>
          <div className="condition-list mar-left-13">
            <label>시각화 방법</label>
            <select className="custom-select" value={visualType} onChange={e => setVisualType(e.target.value as LifeAnalysisCondition['visualType'])}>
              {Object.entries(LIFE_SERVICE_VISUAL).map(([key, value]) => (
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
