import "ol/ol.css";
import { Population } from "./subcontent/Population";
import { Life } from "./subcontent/Life";
import { Etc } from "./subcontent/Etc";
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

  const contentComponent = (key: string, selectedTab: string) => {
    switch (key) {
      case 'population':
        return <Population selectedTab={selectedTab}/>;
      case 'life':
      return <Life selectedTab={selectedTab}/>;
      case 'etc':
        return <Etc selectedTab={selectedTab}/>;
      default:
        return null;
    }
  };

  return (
    <div className="sub-contents">
      <button type="button"></button>
      <div className="content-wrapper">
        <h3>분석서비스</h3>
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
        {Object.entries(tabArr).map(([key]) => (
          <div>
            {key === selectedNav && contentComponent(key, selectedTab)}
          </div>
        ))}
      </div>
    </div>
  );
  
}
