import "ol/ol.css";

import { useEffect, useState } from "react";
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
/**
 * 좌측 분석기능 검색 조건 창
 */
interface SubContentProps {
  selectedNav: string;
}

export const SubContent = ({ selectedNav }: SubContentProps) => {

  const [analysisConditions, setAnalysisConditions] = useState({
    areaType: 'admin',
    sgg: '전체',
    emd: '전체',
    year: '연도',
    month: '월',
    service: '생활 서비스',
    visualType: '시각화 방법',
    analysisFac: '분석 시설',
    analysisPop: '분류',
    analysisPopDetail: '세부 분류',
    analysisArriveFac: '도착 시설',
    business: '업종'
  });
  
  const tabItems = tabJSON[selectedNav]?.tabs || [];
  const [selectedTab, setSelectedTab] = useState<string>('');

  useEffect(() => {
    if (tabItems.length > 0) {
      setSelectedTab(tabItems[0].value);
    }
  }, [tabItems]); 

  const contentComponent = (selectedTab:string) => {
    switch (selectedTab) {
      case 'flow':
        return <PopFlow analysisConditions={analysisConditions} />;
      case 'inflow':
        return <InflowPop analysisConditions={analysisConditions} />;
      case 'sales':
        return <Sales analysisConditions={analysisConditions} />;
      case 'service':
        return <LifeService analysisConditions={analysisConditions} />;
      case 'traffic':
        return <LifeTrafficAccidentArea analysisConditions={analysisConditions}/>;
      case 'vulnArea':
        return <LifeVulnArea analysisConditions={analysisConditions}/>;
      case 'distanceFac':
        return <LifeDistanceFac analysisConditions={analysisConditions}/>;
      case 'commPop':
          return <CommPop analysisConditions={analysisConditions}/>;
      case 'location':
        return <Location analysisConditions={analysisConditions}/>;
      case 'areaSales':
        return <AreaSales analysisConditions={analysisConditions}/>;
      case 'fesInflux':
        return <FestivalInflux analysisConditions={analysisConditions}/>;
      case 'fesRevenue':
        return <FestivalRevenue analysisConditions={analysisConditions}/>;
      default:
        return null;
    }
  };

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
            onClick={() => setSelectedTab(item.value)}
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
