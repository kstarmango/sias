import "ol/ol.css";
import { MapOptions } from "ol/Map";

export interface NavProps extends MapOptions {

}

export const Nav = () => {

  return (
    <nav>
      <button type="button" className="selected">
        <span className="icon real-estate selected"></span>
        <span className="title">부동산<br />정보</span>
      </button>
    </nav>
  );
}
