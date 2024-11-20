import "ol/ol.css";
import { MapOptions } from "ol/Map";
import { useState } from "react";

export interface RealEstateProps extends MapOptions {

}

export const RealEstate = () => {
  const [analyOpt, setAnalyOpt] = useState("owner");
  const [areaOpt, setAreaOpt] = useState("adminDist");

  const handleAnalyOptChange = (e) => setAnalyOpt(e.target.value);
  const handleAreaOptChange = (e) => setAreaOpt(e.target.value);
  

  return (
    <div className="content-wrapper">
      <h3>부동산정보</h3>
      <div className="tabmenu">
        <button type="button" className="selected"><span className="title">토지행정</span></button>
        <button type="button"><span className="title">토지거래현황</span></button>
        <button type="button"><span className="title">지가변동률</span></button>
      </div>
      <div className="information">
        <div className="title info-icon">토지행정 서비스</div>
        <div className="explanation">지적을 검색하여 일필지 정보를 검색하고 조회하는 서비스입니다.</div>
      </div>
      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">분석타입</div>
        <div className="analysis-content">
          <label className="custom-radio">
            <input 
              type="radio" 
              name="option" 
              value="owner"
              checked={analyOpt === 'owner'}
              onChange={handleAnalyOptChange} 
            />
            <span className="radio-mark"></span> 소유자
          </label>
          <label className="custom-radio">
            <input 
              type="radio" 
              name="option"
              value="adminDist"
              checked={areaOpt === 'adminDist'} 
              onChange={handleAnalyOptChange}
            />
            <span className="radio-mark"></span> 지목
          </label>
        </div>
      </div>
      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">영역설정</div>
        <div className="analysis-content">
          <label className="custom-radio">
            <input 
              type="radio" 
              name="option"
              value="adminDist"
              checked={areaOpt === 'adminDist'}
              onChange={handleAreaOptChange}
            />
            <span className="radio-mark"></span> 행정구역
          </label>
          <label className="custom-radio">
            <input 
              type="radio" 
              name="option" 
              value="userArea"
              checked={areaOpt === 'userArea'}
              onChange={handleAreaOptChange}
            />
            <span className="radio-mark"></span> 사용자영역
          </label>
        </div>
        <div className="clear-both search-condition mar-top-10">
          <div className="condition-list mar-left-13">
            <label>시군구</label>
            <div className="custom-select width-100">
              <span>목포시</span>
            </div>
          </div>
          <div className="condition-list mar-left-13">
            <label>읍면동</label>
            <div className="custom-select width-100">
              <span>금화동</span>
            </div>
          </div>
        </div>
      </div>
      <div className="button-large-wrapper">
        <button type="button" className="large-button apply">
          <span className="txt">분석하기</span>
        </button>
      </div>
    </div>
  );
}
