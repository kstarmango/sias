import "ol/ol.css";

import { useContext, useEffect, useState } from "react";
import tabJSON from '../tab.json';
import { PopFlow } from "../subcontent/pop/PopFlow";
import { InflowPop } from "../subcontent/pop/InflowPop";
import { Sales } from "../subcontent/pop/Sales";
import { LifeTrafficAccidentArea } from "../subcontent/life/LifeTrafficAccidentArea";
import { LifeVulnArea } from "../subcontent/life/LifeVulnArea";
import { LifeService } from "../subcontent/life/LifeService";
import { LifeDistanceFac } from "../subcontent/life/LifeDistanceFac";
import { CommPop } from "../subcontent/comm/CommPop";
import { Location } from "../subcontent/comm/Location";
import { AreaSales } from "../subcontent/comm/AreaSales";
import { FestivalInflux } from "../subcontent/comm/FestivalInflux";
import { FestivalRevenue } from "../subcontent/comm/FestivalRevenue";
import { MapContext } from "@src/contexts/MapView2DContext";
/**
 * 좌측 분석기능 검색 조건 창
 */
interface SubContentProps {
  selectedNav: string;
}

export const SubContent = ({ selectedNav }: SubContentProps) => {
  
  const tabItems = tabJSON[selectedNav]?.tabs || [];
  const [selectedTab, setSelectedTab] = useState<string>('');

  const { getTitleLayer } = useContext(MapContext);

  useEffect(() => {
    if (tabItems.length > 0) {
      setSelectedTab(tabItems[0].value);
    }
  }, [tabItems]); 

  const contentComponent = (selectedTab:string) => {
    switch (selectedTab) {
      case 'flow':
        return <PopFlow />;
      case 'inflow':
        return <InflowPop />;
      case 'sales':
        return <Sales />;
      case 'service':
        return <LifeService />;
      case 'traffic':
        return <LifeTrafficAccidentArea />;
      case 'vulnArea':
        return <LifeVulnArea />;
      case 'distanceFac':
        return <LifeDistanceFac />;
      case 'commPop':
        return <CommPop />;
      case 'location':
        return <Location />;
      case 'areaSales':
        return <AreaSales />;
      case 'fesInflux':
        return <FestivalInflux/>;
      case 'fesRevenue':
        return <FestivalRevenue />;
      default:
        return null;
    }
  };

  const selectedTabChange = (tab: string) => {
    setSelectedTab(tab);
    // 분석 결과 초기화
    getTitleLayer('analysisInput')?.getSource()?.clear();
  }

  return (
    <div className="sub-contents">
      <button className="close sub-content" type="button"></button>
      <div className="content-wrapper">
        <div className="tabmenu">
          {tabItems.map((item) => (
            <button
            key={item.value}
            type="button"
            className={item.value === selectedTab ? 'selected' : ''}
            onClick={() => selectedTabChange(item.value)}
            >
              <span className="title">{item.title}</span>
            </button>
          ))}
        </div>
        {contentComponent(selectedTab)}
      </div>
    </div>
  );
  
}
