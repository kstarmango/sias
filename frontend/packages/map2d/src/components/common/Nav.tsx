import "ol/ol.css";
import { MapOptions } from "ol/Map";
import { ANALYSIS_TAB_TYPE } from "@src/utils/analysis-constant";

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
      {Object.keys(ANALYSIS_TAB_TYPE).map((key) => (
        <button type="button" key={key} onClick={() => onNavClick(key)} className={getButtonSelected(key)}>
          <span className="icon real-estate selected"></span>
          <span className="title" style={{whiteSpace: 'pre-line'}}>
            {ANALYSIS_TAB_TYPE[key].label.title}
          </span>
        </button>
      ))}
    </nav>
  );
}
