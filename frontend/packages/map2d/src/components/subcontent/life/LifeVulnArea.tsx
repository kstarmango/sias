import { useCallback, useContext, useState } from "react";
import { useRecoilState } from "recoil";
import "ol/ol.css";
import WKT from "ol/format/WKT";
import Feature from "ol/Feature";

import { getSelSgg } from "@src/services/analyRequestApi";
import { MapContext } from "@src/contexts/MapView2DContext";
import { EmdInfo, SggInfo } from "@src/types/analysis-condition";
import { lifeVulnAnalysisConditionState } from "@src/stores/AnalysisCondition";
import { getPopList, getPopTypeList, getSelEmd, getSggList, getWeakCatList } from "@src/services/analyRequestApi";

/**
 * 취약지역 시설 분석 컴포넌트
 * 
 * @param analysisConditions 분석조건
 */

export const LifeVulnArea = () => {

  // 분석조건 상태
  const [ lifeVulnAnalysisCondition, setLifeVulnAnalysisCondition ] = useRecoilState(lifeVulnAnalysisConditionState);
  const { gwangju, lifeServiceFacility, analysisPop } = lifeVulnAnalysisCondition;
  const { map, getTitleLayer } = useContext(MapContext);

  const updateAnalysisCondition = useCallback((key: keyof typeof lifeVulnAnalysisCondition, value: any) => 
    setLifeVulnAnalysisCondition(prev => ({...prev, [key]: value})),
    [lifeVulnAnalysisCondition]
  );

  const [popInclude, setPopInclude] = useState<boolean>(true);
  const [areaType, setAreaType] = useState<string>('admin');
  const [analysisPopType, setAnalysisPopType] = useState<string>('총인구');

  const handleAreaTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => setAreaType(e.target.value); 

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

  const { data: weakCatList } = getWeakCatList();

  const { data: popTypeList } = getPopTypeList();
  const { data: popList } = getPopList(analysisPopType);

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

    const source = getTitleLayer('analysisInput')?.getSource();
    source?.clear();
    source?.addFeature(feature);

    map?.getView().fit(geom.getExtent(), {
      padding: [10, 10, 10, 10],
      duration: 300
    });
  } 

  return (
    <div className="main-content">
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
          <div className="clear-both search-condition mar-top-10">
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
            <select className="custom-select" value={lifeServiceFacility} onChange={e => updateAnalysisCondition('lifeServiceFacility', e.target.value)}>
              {weakCatList?.map((item, idx) => (
                <option key={idx} value={item.psy_nm}>{item.log_nm}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">인구정보 설정</div>
        <div className="analysis-content search-condition">
          <label>
            <input type="checkbox" checked={popInclude} onChange={() => setPopInclude(!popInclude)} style={{marginRight: '10px'}}/>
            <span>인구 포함</span>
          </label>
        </div>
        {popInclude && (
          <div className="clear-both search-condition mar-top-10">
            <div className="condition-list mar-left-13">
              <label>분류</label>
              <select className="custom-select" value={analysisPopType} onChange={e => setAnalysisPopType(e.target.value)}>
                {popTypeList?.map((item, idx) => (
                  <option key={idx} value={item.log_type_nm}>{item.log_type_nm}</option>
                ))}
              </select>
            </div>
            <div className="condition-list mar-left-13">
              <label>세부분류</label>
              <select className="custom-select" value={analysisPop} onChange={e => updateAnalysisCondition('analysisPop', e.target.value)}>
                {popList?.map((item, idx) => (
                  <option key={idx} value={item.psy_col_nm}>{item.log_col_nm}</option>
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
            <input type="checkbox" onChange={() => updateAnalysisCondition('gwangju', !gwangju)} style={{marginRight: '10px'}}/>
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
