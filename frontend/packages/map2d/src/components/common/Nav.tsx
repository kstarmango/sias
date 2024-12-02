import "ol/ol.css";
import { MapOptions } from "ol/Map";
import tabJSON from '../tab.json';

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
      {Object.keys(tabJSON).map((key) => (
        <button type="button" key={key} onClick={() => onNavClick(key)} className={getButtonSelected(key)}>
          <span className="icon real-estate selected"></span>
          <span className="title" style={{whiteSpace: 'pre-line'}}>
            {tabJSON[key].label.title}
          </span>
        </button>
      ))}
    </nav>
  );
}
