import "ol/ol.css";

import { useEffect, useState } from "react";
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

//  * 각 버튼들을 배열로 만들어서 객체의 값으로 넣어놓는 구조
const tabArr = {
  'population': ['유동인구현황', '유입인구현황', '매출현황'],
  'life': ['생활서비스 조회','교통사고 다발지역 조회', '취약지역 조회', '최단거리 시설 분석'],
  'festival': ['상권 인구 분석', '지점분석', '상권 매출 분석', '축제 유입 분석', '축제 매출 분석']
}

export const SubContent = ({ selectedNav }: SubContentProps) => {

  const [analysisConditions, setAnalysisConditions] = useState({
    areaType: '',
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

  const tabItems: string[] = tabArr[selectedNav] || [];
  const [selectedTab, setSelectedTab] = useState<string>('');

  useEffect(() => {
    if (tabItems.length > 0) {
      setSelectedTab(tabItems[0]);
    }
  }, [tabItems]); 

  const contentComponent = (selectedTab: string) => {
    switch (selectedTab) {
      case '유동인구현황':
        return <PopFlow analysisConditions={analysisConditions} />;
      case '유입인구현황':
        return <InflowPop analysisConditions={analysisConditions} />;
      case '매출현황':
        return <Sales analysisConditions={analysisConditions} />;
      case '생활서비스 조회':
        return <LifeService analysisConditions={analysisConditions} />;
      case '교통사고 다발지역 조회':
        return <LifeTrafficAccidentArea analysisConditions={analysisConditions}/>;
      case '취약지역 조회':
        return <LifeVulnArea analysisConditions={analysisConditions}/>;
      case '최단거리 시설 분석':
        return <LifeDistanceFac analysisConditions={analysisConditions}/>;
      case '상권 인구 분석':
          return <CommPop analysisConditions={analysisConditions}/>;
      case '지점분석':
        return <Location analysisConditions={analysisConditions}/>;
      case '상권 매출 분석':
        return <AreaSales analysisConditions={analysisConditions}/>;
      case '축제 유입 분석':
        return <FestivalInflux analysisConditions={analysisConditions}/>;
      case '축제 매출 분석':
        return <FestivalRevenue analysisConditions={analysisConditions}/>;
      default:
        return null;
    }
  };

  return (
    <div className="sub-contents">
      <button className="close sub-content" type="button" ></button>
      <div className="content-wrapper">
        <div className="tabmenu">
          {tabItems.map((item) => (
            <button
            type="button"
            className={item === selectedTab ? 'selected' : ''}
            onClick={() => setSelectedTab(item)}
            >
              <span className="title">{item}</span>
            </button>
          ))}
        </div>
        {contentComponent(selectedTab)}
      </div>
    </div>
  );
  
}
