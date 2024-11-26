import CustomSelect from "@src/components/ui/CustomSelect";
import { LifeAnalysisCondition } from "@src/types/analysis-condition";
import "ol/ol.css";
import { useRecoilState } from "recoil";
import { lifeAnalysisConditionState } from "@src/stores/AnalysisCondition";

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

  // 임시 데이터 목록
  const TEMP_SGG_LIST = ['전체', '목포시', '여수시', '순천시', '완도군', '진도군'];
  const TEMP_EMD_LIST = ['전체', '금화동', '영산동', '중앙동', '중동', '중앙동'];
  const TEMP_SERVICE_LIST = ['약국', '병원', '어린이집', '장애인시설', '시장', '대형마트', '경로당'];
  const VISUAL_LIST = ['포인트', '단계구분', '히트맵', '클러스터']

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
            <CustomSelect options={TEMP_SGG_LIST} selectedOptionState={[sgg, setSgg]} onSelect={(e) => setSgg(e)} />
          </div>
          <div className="condition-list mar-left-13">
            <label>읍면동</label>
            <CustomSelect options={TEMP_EMD_LIST} selectedOptionState={[emd, setEmd]} onSelect={(e) => setEmd(e)} />
          </div>
        </div>
      </div>
      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">분석조건 설정</div>
        <div className="analysis-content search-condition">
          <div className="condition-list mar-left-13">
            <label style={{whiteSpace: 'nowrap'}}>생활서비스 시설</label>
            <CustomSelect options={TEMP_SERVICE_LIST} selectedOptionState={[lifeServiceFacility, setLifeServiceFacility]} onSelect={setLifeServiceFacility} />
          </div>
          <div className="condition-list mar-left-13">
            <label>시각화 방법</label>
            <CustomSelect options={VISUAL_LIST} selectedOptionState={[visualType, setVisualType]} onSelect={setVisualType} />
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
