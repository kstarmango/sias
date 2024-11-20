import "ol/ol.css";
import { MapOptions } from "ol/Map";

export interface LifeServiceProps extends MapOptions {

}

export const LifeService = () => {
  return (
    <div>
      <div className="information">
        <div className="title info-icon">생활서비스</div>
        <div className="explanation">의료, 교육, 복지, 상업, 기타 생활서비스 데이터 조회 및 시각화를 수행하는 서비스 입니다.</div>
      </div>
      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">영역설정</div>
        <div className="clear-both search-condition">
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
      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">분석조건 설정</div>
        <div className="clear-both search-condition">
          <div className="condition-list mar-left-13">
            <label>생활서비스 시설</label>
            <div className="custom-select width-100">
              <span>목포시</span>
            </div>
          </div>
          <div className="condition-list mar-left-13">
            <label>시각화 방법</label>
            <div className="custom-select">
              <select className="select-scroll">
                <option className="list"><a>포인트</a></option>
                <option className="list"><a>단계구분</a></option>
                <option className="list"><a>히트맵</a></option>
                <option className="list"><a>클러스터</a></option>
              </select>
            </div>
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
