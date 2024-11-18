import "ol/ol.css";
import { MapOptions } from "ol/Map";

export interface PopupLayerProps extends MapOptions {

}

/**
 * 팝업
*/
export const PopupLayer = () => {

  return (
    <div className="popup popup-layer">
      <button type="button" className="close popup-close"></button>
      <h2><span className="txt">레이어</span></h2>
      <div className="content-wrapper mar-top-20">
        <div className="popup-tabmenu">
          <button type="button" className="selected">행정구역</button>
          <button type="button" className="selected">연속지적도</button>
          <button type="button">투자지구</button>
          <button type="button" className="selected">용도지역지구</button>
          <button type="button">생활인구</button>
          <button type="button">섬관리</button>
        </div>
        <div className="layer-list-wrapper mar-top-10">
          <ul className="layer-list">
            <li>
              <div className="list selected">
                <span className="txt">행정구역</span>
                <span className="toggle-switch">
                  <input type="checkbox" id="toggle" />
                  <label htmlFor="toggle"></label>
                </span>
              </div>
              <ul>
                <li>
                  <span className="type-color" style={{ background: "#8BF8E9" }}></span>
                  <span className="txt">시군</span>
                  <span className="toggle-switch">
                    <input type="checkbox" id="toggle1" />
                    <label htmlFor="toggle1"></label>
                  </span>
                </li>
                <li>
                  <span className="type-color" style={{ background: "#F39D07" }}></span>
                  <span className="txt">읍면동</span>
                  <span className="toggle-switch">
                    <input type="checkbox" id="toggle1" />
                    <label htmlFor="toggle1"></label>
                  </span>
                </li>
                <li>
                  <span className="type-color" style={{ background: "#70CF5A" }}></span>
                  <span className="txt">리</span>
                  <span className="toggle-switch">
                    <input type="checkbox" id="toggle2" />
                    <label htmlFor="toggle2"></label>
                  </span>
                </li>
              </ul>
            </li>
            <li>
              <div className="list selected">
                <span className="txt">생활인구</span>
                <span className="toggle-switch">
                  <input type="checkbox" id="toggle" />
                  <label htmlFor="toggle"></label>
                </span>
              </div>
              <ul>
                <li>
                  <span className="type-color" style={{ background: "#8BF8E9" }}></span>
                  <span className="txt">시군</span>
                  <span className="toggle-switch">
                    <input type="checkbox" id="toggle1" />
                    <label htmlFor="toggle1"></label>
                  </span>
                </li>
                <li>
                  <span className="type-color" style={{ background: "#F39D07" }}></span>
                  <span className="txt">읍면동</span>
                  <span className="toggle-switch">
                    <input type="checkbox" id="toggle1" />
                    <label htmlFor="toggle1"></label>
                  </span>
                </li>
                <li>
                  <span className="type-color" style={{ background: "#70CF5A" }}></span>
                  <span className="txt">리</span>
                  <span className="toggle-switch">
                    <input type="checkbox" id="toggle2" />
                    <label htmlFor="toggle2"></label>
                  </span>
                </li>
              </ul>
            </li>
            <li>
              <div className="list selected">
                <span className="txt">연속지적도</span>
                <span className="toggle-switch">
                  <input type="checkbox" id="toggle" />
                  <label htmlFor="toggle"></label>
                </span>
              </div>
              <ul>
                <li>
                  <span className="type-color" style={{ background: "#8BF8E9" }}></span>
                  <span className="txt">시군</span>
                  <span className="toggle-switch">
                    <input type="checkbox" id="toggle1" />
                    <label htmlFor="toggle1"></label>
                  </span>
                </li>
                <li>
                  <span className="type-color" style={{ background: "#F39D07" }}></span>
                  <span className="txt">읍면동</span>
                  <span className="toggle-switch">
                    <input type="checkbox" id="toggle1" />
                    <label htmlFor="toggle1"></label>
                  </span>
                </li>
                <li>
                  <span className="type-color" style={{ background: "#70CF5A" }}></span>
                  <span className="txt">리</span>
                  <span className="toggle-switch">
                    <input type="checkbox" id="toggle2" />
                    <label htmlFor="toggle2"></label>
                  </span>
                </li>
              </ul>
            </li>
            <li>
              <div className="list selected">
                <span className="txt">용도지역지구(국토계획법)</span>
                <span className="toggle-switch">
                  <input type="checkbox" id="toggle" />
                  <label htmlFor="toggle"></label>
                </span>
              </div>
              <ul>
                <li>
                  <span className="type-color" style={{ background: "#8BF8E9" }}></span>
                  <span className="txt">시군</span>
                  <span className="toggle-switch">
                    <input type="checkbox" id="toggle1" />
                    <label htmlFor="toggle1"></label>
                  </span>
                </li>
                <li>
                  <span className="type-color" style={{ background: "#F39D07" }}></span>
                  <span className="txt">읍면동</span>
                  <span className="toggle-switch">
                    <input type="checkbox" id="toggle1" />
                    <label htmlFor="toggle1"></label>
                  </span>
                </li>
                <li>
                  <span className="type-color" style={{ background: "#70CF5A" }}></span>
                  <span className="txt">리</span>
                  <span className="toggle-switch">
                    <input type="checkbox" id="toggle2" />
                    <label htmlFor="toggle2"></label>
                  </span>
                </li>
              </ul>
            </li>
            <li>
              <div className="list non-selected">
                <span className="txt">투자지구</span>
                <span className="toggle-switch">
                  <input type="checkbox" id="toggle" />
                  <label htmlFor="toggle"></label>
                </span>
              </div>
            </li>
            <li>
              <div className="list non-selected">
                <span className="txt">생활인구</span>
                <span className="toggle-switch">
                  <input type="checkbox" id="toggle" />
                  <label htmlFor="toggle"></label>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
