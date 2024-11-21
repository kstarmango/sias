import { AnalysisCondition } from "@src/types/analysis-condition";
import "ol/ol.css";
import { useState } from "react";
import CustomSelect from "../ui/CustomSelect";

export interface LifeShortDistanceFacProps {

    analysisConditions: AnalysisCondition;

}

export const LifeShortDistanceFac = ({ analysisConditions }: LifeShortDistanceFacProps) => {

    const [areaType, setAreaType] = useState<string>(analysisConditions.areaType);
    const [sgg, setSgg] = useState<string>(analysisConditions.sgg);
    const [analysisArriveFac, setAnalysisArriveFac] = useState<string>(analysisConditions.analysisArriveFac);

    const handleAreaTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => setAreaType(e.target.value); 

    // 임시 데이터 목록
    const TEMP_SGG_LIST = ['전체', '목포시', '여수시', '순천시', '완도군', '진도군'];
    const ALALYSIS_ARRIVE_FAC_LIST = ['응급의료시설', '소아산부인과', '어린이집 보육시설', '생활방범', '소방서'];

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
                        <CustomSelect options={TEMP_SGG_LIST} selectedOptionState={[sgg, setSgg]} onSelect={(e) => setSgg(e)} />
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
                        <div  style={{ backgroundColor: "black", borderRadius: '6px', border: '1px solid rgb(125, 125, 125)', padding: '5px 0', minWidth: '80px', maxWidth: '150px', fontSize: 'var(--font-size-regular)', fontFamily: 'var(--font-family-light)'}}>
                            <span>선택(포인트)</span>
                        </div>
                    </div>
                    <div className="condition-list mar-left-13">
                        <label>도착시설</label>
                        <CustomSelect options={ALALYSIS_ARRIVE_FAC_LIST} selectedOptionState={[analysisArriveFac, setAnalysisArriveFac]} onSelect={(e) => setAnalysisArriveFac(e)} />
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