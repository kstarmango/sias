import "ol/ol.css";
import { LifeService } from "./subcontent/LifeService";
import { LifeVulnArea } from "./subcontent/LifeVulnArea";
import { LifeTrafficAccidentArea } from "./subcontent/LifeTrafficAccidentArea";
import { LifeShortDistanceFac } from "./subcontent/LifeShortDistanceFac";
import { useEffect, useState } from "react";
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
  'etc': ['상권 인구 분석', '지점분석', '상권 매출 분석', '축제 유입 분석', '축제 매출 분석']
}

export const SubContent = ({ selectedNav }: SubContentProps) => {

  const tabItems: string[] = tabArr[selectedNav] || [];

  const [selectedTab, setSelectedTab] = useState<string>('');

  useEffect(() => {
    if (tabItems.length > 0) {
      setSelectedTab(tabItems[0]);
    }
  }, [tabItems]); 

  const contentComponent = (selectedTab: string) => {
    switch (selectedTab) {
      case '생활서비스 조회':
        return <LifeService/>;
      case '교통사고 다발지역 조회':
        return <LifeTrafficAccidentArea/>;
      case '취약지역 조회':
        return <LifeVulnArea/>;
      case '최단거리 시설 분석':
        return <LifeShortDistanceFac/>;
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
