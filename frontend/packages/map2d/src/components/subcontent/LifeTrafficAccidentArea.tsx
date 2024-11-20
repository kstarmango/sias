import "ol/ol.css";
import { MapOptions } from "ol/Map";
import { useState } from "react";

export interface LifeTrafficAccidentAreaProps extends MapOptions {

}

export const LifeTrafficAccidentArea = () => {

    const [areaType, setAreaType] = useState("bufferSpot");
    const [weather, setWeather] = useState<boolean>(false);

    const handleAreaTypeChange = (e) => setAreaType(e.target.value);
    const handleWeatherChange = () => setWeather(!weather);
    
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
                        value="bufferSpot"
                        checked={areaType === 'bufferSpot'}
                        onChange={handleAreaTypeChange}
                        />
                        <span className="radio-mark"></span> 지점
                    </label>
                    <label className="custom-radio">
                        <input 
                        type="radio" 
                        name="areaType" 
                        value="area"
                        checked={areaType === 'area'}
                        onChange={handleAreaTypeChange}
                        />
                        <span className="radio-mark"></span> 영역
                    </label>
                </div>
                <div className="condition-list">
                    {areaType === 'bufferSpot' ? (
                        <div className="clear-both condition-area mar-top-10">
                            <label>버퍼</label>
                            <input type="text"/>m
                        </div>
                    ) : (
                        <div className="clear-both condition-area mar-top-10">
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
            </div>
            <div className="analysis-condition-wrapper mar-top-30">
                <div className="analysis-title">분석조건 설정</div>
                <div className="analysis-content">
                    <label>
                        <input type="checkbox" onChange={handleWeatherChange} />인구 포함
                    </label>
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