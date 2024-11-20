import "ol/ol.css";
import { MapOptions } from "ol/Map";
import { useState } from "react";

export interface LifeShortDistanceFacProps extends MapOptions {

}

export const LifeShortDistanceFac = () => {

    const [areaOpt, setAreaOpt] = useState("adminDist");

    const handleAreaOptChange = (e) => setAreaOpt(e.target.value);

    return(
        <div>
            <div className="information">
                <div className="title info-icon">최단거리 시설 분석</div>
                <div className="explanation">분석시설(학교, 어린이집, 문화시설, 소방서, 병원)으로 부터 접근성이 취약한 지역을 조회하고 특정지점으로 부터 대상지까지 네트워크 분석을 수행하는 서비스입니다.</div>
            </div>
            <div className="analysis-condition-wrapper mar-top-30">
                <div className="analysis-title">영역설정</div>
                <div className="analysis-content">
                    <label className="custom-radio">
                        <input 
                        type="radio" 
                        name="areaOption"
                        value="adminDist"
                        checked={areaOpt === 'adminDist'}
                        onChange={handleAreaOptChange}
                        />
                        <span className="radio-mark"></span> 행정구역
                    </label>
                    <label className="custom-radio">
                        <input 
                        type="radio" 
                        name="areaOption" 
                        value="userArea"
                        checked={areaOpt === 'userArea'}
                        onChange={handleAreaOptChange}
                        />
                        <span className="radio-mark"></span> 사용자영역
                    </label>
                </div>
                <div className="clear-both search-condition">
                    <div className="condition-list mar-left-13">
                        <label>시군구</label>
                        <div className="custom-select width-100">
                        <span>목포시</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="analysis-condition-wrapper mar-top-30">
                <div className="analysis-title">분석조건 설정</div>
                <div className="clear-both search-condition">
                    <div className="condition-list mar-left-13">
                        <label>출발지점</label>
                        <div className="custom-select width-100">
                            <span>선택(포인트)</span>
                        </div>
                    </div>
                    <div className="condition-list mar-left-13">
                        <label>도착시설</label>
                        <div className="custom-select width-100">
                            <span>학교</span>
                        </div>
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