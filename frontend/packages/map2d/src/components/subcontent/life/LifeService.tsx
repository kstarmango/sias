import "ol/ol.css";
import WKT from "ol/format/WKT";
import Feature from "ol/Feature";
import { useRecoilState } from "recoil";
import { useContext, useEffect, useState } from "react";

import { EmdInfo, LifeAnalysisCondition, SggInfo } from "@src/types/analysis-condition";
import { lifeAnalysisConditionState } from "@src/stores/AnalysisCondition";
import { getLifeCatList, getSelEmd, getSelSgg, getSggList } from "@src/services/analyRequestApi";
import { LIFE_SERVICE_VISUAL } from "@src/utils/analysis-constant";
import { useMapContext } from "@src/context/MapContext";
import { getTitleLayer } from "@src/utils/mapUtils";


/**
 * 생활서비스 조회컴포넌트
 * 
 * @param analysisConditions 분석조건
 */
export const LifeService = () => {

  // 분석조건 상태
  const [ lifeAnalysisCondition, setLifeAnalysisCondition ] = useRecoilState(lifeAnalysisConditionState);
  const { lifeServiceFacility, visualType } = lifeAnalysisCondition;
  const { map } = useMapContext();

  const setInputWkt = (value: string) => setLifeAnalysisCondition({...lifeAnalysisCondition, inputWkt: value});
  const setLifeServiceFacility = (value: LifeAnalysisCondition['lifeServiceFacility']) => setLifeAnalysisCondition({...lifeAnalysisCondition, lifeServiceFacility: value});
  const setVisualType = (value: LifeAnalysisCondition['visualType']) => setLifeAnalysisCondition({...lifeAnalysisCondition, visualType: value});

  // 시군구, 읍면동 상태
  const [ sgg, setSgg ] = useState('');
  const [ emd, setEmd ] = useState('');
  const { data: sggList } = getSggList();

  const changeSggEmd = (data: any, type: 'sgg' | 'emd') => {
    const info = type === 'sgg' ? data.sggInfo as SggInfo : data as EmdInfo;

    if (info) {
      zoomToAdminstr(info as SggInfo | EmdInfo);
    }
  }

  const { data: selSggInfo } = getSelSgg(sgg, (data) => changeSggEmd(data, 'sgg'));
  const { data: selEmdInfo } = getSelEmd(emd, (data) => changeSggEmd(data, 'emd'));

  const { data: lifeCatList } = getLifeCatList();

  /**
   * 영역 확대
   * @param info 시군구 또는 읍면동 정보
   */
  const zoomToAdminstr = (info: SggInfo | EmdInfo) => {
    const wkt = new WKT();
    const geom = wkt.readGeometry(info.geom);

    const feature = new Feature({
      geometry: geom,
    });

    const source = getTitleLayer(map, 'analysisInput')?.getSource();
    source?.clear();
    source?.addFeature(feature);

    map?.getView().fit(geom.getExtent(), {
      padding: [10, 10, 10, 10],
      duration: 300
    });
  }

  return (
    <>
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
              {sggList?.map((item, idx) => (
                <option key={idx} value={item.sig_cd}>{item.sig_kor_nm}</option>
              ))}
            </select>
          </div>
          <div className="condition-list mar-left-13">
            <label>읍면동</label>
            <select className="custom-select" value={emd} onChange={e => setEmd(e.target.value)}>
              {sgg && selSggInfo 
                ? 
                  <>
                    <option value={sgg}>전체</option>
                    {
                      selSggInfo.emdList.map((item, idx) => (
                        <option key={idx} value={item.emd_cd}>{item.emd_kor_nm}</option>
                      )) 
                    }
                  </>
                : <option value="">시군구 선택해주세요.</option>
              }
            </select>
          </div>
        </div>
      </div>
      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">분석조건 설정</div>
        <div className="analysis-content search-condition">
          <div className="condition-list mar-left-13">
            <label style={{whiteSpace: 'nowrap'}}>생활서비스 시설</label>
            <select className="custom-select" value={lifeServiceFacility} onChange={e => setLifeServiceFacility(e.target.value)}>
              {lifeCatList?.map((item, idx) => (
                <option key={idx} value={item.psy_nm}>{item.log_nm}</option>
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
    </>
  );
}
