import { AnalysisCondition } from "@src/types/analysis-condition";
import "ol/ol.css";
import { useState } from "react";

export interface LifeTrafficAccidentAreaProps {
    analysisConditions: AnalysisCondition;
}

/**
 * 교통사고 다발지역 조회 컴포넌트
 * 
 * @param analysisConditions 분석조건
 */

export const LifeTrafficAccidentArea = ({ analysisConditions }: LifeTrafficAccidentAreaProps) => {

    // 분석조건 상태
    const [areaType, setAreaType] = useState<string>(analysisConditions.areaType);
    const [weather, setWeather] = useState<boolean>(false);
    const [dataPopup, setDataPopup] = useState<boolean>(false);

    const handleAreaTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => setAreaType(e.target.value); 
    const handleWeatherChange = () => setWeather(!weather);
    const handleDataPopup = () => setDataPopup(!dataPopup);
    
    return(
        <div>
            <div className="information">
                <div className="title info-icon">교통사고 다발지역</div>
                <div className="explanation">도로교통공단 교통사고분석시스템에서 제공된 사망교통사고, 보행자무단횡단사고 다발지역 등을 통하여 사고 다발지역을 제공하는 서비스입니다.</div>
            </div>
            <div className="analysis-condition-wrapper mar-top-30">
                <div className="analysis-title">영역설정</div>
                <div className="analysis-content">
                    <label className="custom-radio">
                        <input 
                        type="radio" 
                        name="areaType"
                        value="spot"
                        checked={areaType === 'spot'}
                        onChange={handleAreaTypeChange}
                        />
                        <span className="radio-mark"></span> 지점
                    </label>
                    <label className="custom-radio">
                        <input 
                        type="radio" 
                        name="areaType" 
                        value="user"
                        checked={areaType === 'user'}
                        onChange={handleAreaTypeChange}
                        />
                        <span className="radio-mark"></span> 영역
                    </label>
                </div>
                {areaType === 'spot' && (
                    <div className="condition-list mar-left-13">
                        <div className="clear-both condition-area mar-top-10">
                            <label>버퍼</label>
                            <input type="text"/>
                            <span>m</span>
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
                    <label>
                        <input type="checkbox" style={{marginRight: '10px'}} onChange={handleWeatherChange} />
                        <span>날씨</span>
                    </label>
                </div>
            </div>
            <div className="button-large-wrapper">
                <button type="button" className={dataPopup ? 'normal-button apply' : 'normal-button cancel'} style={{height: '40px'}} onClick={handleDataPopup}>제공데이터 확인</button>
                <button type="button" className="large-button apply">
                    <span className="txt">조회</span>
                </button>
            </div>
            {dataPopup && (
                <div className="popup popup-parcel" style={{left: '400px', top: '0'}}>
                    <button type="button" className="close popup-close"></button>
                    <h2><span className="txt">제공데이터</span></h2>
                    <div className="content-wrapper mar-top-20">
                    <div className="explanation">도로교통공단 교통사고분석시스템에서 제공된 사망교통사고, 보행자무단횡단사고 다발지역 등을 통하여 사고 다발지역을 제공하는 서비스입니다.</div>
                    <table className="basic-2col mar-top-7">
                        <tr>
                            <th>데이터</th>
                            <th>출처</th>
                        </tr>
                        <tr>
                            <td>사망교통사고 다발지역</td>
                            <td>교통사고분석시스템 <br/> 2012년 ~ 2022년</td>
                        </tr>
                        <tr>
                            <td>자전거사고 다발지역</td>
                            <td>교통사고분석시스템 <br/> 2013년 ~ 2021년</td>
                        </tr>
                        <tr>
                            <td>스쿨존내어린이사고</td>
                            <td>교통사고분석시스템 <br/> 2013년 ~ 2022년</td>
                        </tr>
                        <tr>
                            <td>보행자무단횡단사고 다발지역</td>
                            <td>교통사고분석시스템 <br/> 2013년 ~ 2021년</td>
                        </tr>
                        <tr>
                            <td>보행어린이사고 다발지역</td>
                            <td>교통사고분석시스템 <br/> 2013년 ~ 2023년</td>
                        </tr>
                        <tr>
                            <td>보행노인사고 다발지역</td>
                            <td>교통사고분석시스템 <br/> 2013년 ~ 202년</td>
                        </tr>
                    </table>
                    </div>
                </div>
            )}
        </div>
    );
}