import "ol/ol.css";
import { useState } from "react";
import { useRecoilState } from "recoil";

import CustomSelect from "@src/components/CustomSelect";
import { lifeDistanceFacConditionState } from "@src/stores/AnalysisCondition";
import { LifeDistanceFacCondition } from "@src/types/analysis-condition";
import { ALALYSIS_ARRIVE_FAC, TEMP_SGG } from "@src/utils/analysis-constant";

/**
 * 취약지역 조회 컴포넌트
 * 
 * @param analysisConditions 분석조건
 */

export const LifeDistanceFac = () => {

    // 분석조건 상태
    const [areaType, setAreaType] = useState<string>('point');
    const [lifeDistanceFacCondition, setLifeDistanceFacCondition] = useRecoilState(lifeDistanceFacConditionState);
    const { inputWkt, sgg, emd, startPoint, endFacility } = lifeDistanceFacCondition;

    const setInputWkt = (value: string) => setLifeDistanceFacCondition({...lifeDistanceFacCondition, inputWkt: value});
    const setSgg = (value: string) => setLifeDistanceFacCondition({...lifeDistanceFacCondition, sgg: value});
    const setEmd = (value: string) => setLifeDistanceFacCondition({...lifeDistanceFacCondition, emd: value});
    const setStartPoint = (value: string) => setLifeDistanceFacCondition({...lifeDistanceFacCondition, inputWkt: value});
    const setEndFacility = (value: LifeDistanceFacCondition['endFacility']) => setLifeDistanceFacCondition({...lifeDistanceFacCondition, endFacility: value});

    const handleAreaTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => setAreaType(e.target.value); 

    return(
        <div>
            <div className="information">
                <div className="title info-icon">최단거리 시설 분석</div>
                <div className="explanation">분석시설(학교, 어린이집, 문화시설, 소방서, 병원)으로 부터 접근성이 취약한 지역을 조회하고 특정지점으로 부터 대상지까지 네트워크 분석을 수행하는 서비스입니다.</div>
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
                        <CustomSelect options={Object.entries(TEMP_SGG)} selectedOptionState={[sgg, setSgg]} onSelect={(e) => setSgg(e)} />
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
                    <div className="condition-list mar-left-13">
                        <label>출발지점</label>
                        <button type="button" className="normal-button cancel">포인트</button>
                    </div>
                    <div className="condition-list mar-left-13">
                        <label>도착시설</label>
                        <CustomSelect options={Object.entries(ALALYSIS_ARRIVE_FAC)} selectedOptionState={[endFacility, setEndFacility]} onSelect={setEndFacility} />
                    </div>
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