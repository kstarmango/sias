import "ol/ol.css";
import { MapOptions } from "ol/Map";

export interface NavProps extends MapOptions {

  onNavClick: (navItem: string) => void;
  selectedNav: string;
  
}

export const Nav = ({ onNavClick, selectedNav }: NavProps) => {

  const getButtonSelected = (buttonName: string) => {
    return selectedNav === buttonName ? 'selected' : ''; 
  };

  return (
    <nav>
      <button type="button" onClick={() => onNavClick('realEstate')} className={getButtonSelected('realEstate')}>
        <span className="icon real-estate selected"></span>
        <span className="title">부동산<br />정보</span>
      </button>
      <button type="button" onClick={() => onNavClick('population')} className={getButtonSelected('population')}>
        <span className="icon mobility-analysis"></span>
        <span className="title">유동인구<br />분석</span>
      </button>
      <button type="button" onClick={() => onNavClick('life')} className={getButtonSelected('life')}>
        <span className="icon lifestyle-information"></span>
        <span className="title">생활정보</span>
      </button>
      <button type="button" onClick={() => onNavClick('administrative')} className={getButtonSelected('administrative')}>
        <span className="icon administrative-information"></span>
        <span className="title">행정정보</span>
      </button>
      <button type="button" onClick={() => onNavClick('festival')} className={getButtonSelected('festival')}>
        <span className="icon other-analysis"></span>
        <span className="title">상권축제</span>
      </button>
    </nav>
  );
}
