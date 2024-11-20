import {MapView2D} from "@src/components";
import { Nav } from "@src/components/Nav";
import { Search } from "@src/components/Search";
import { SubContent } from "@src/components/SubContent";
import ToolBox from "@src/components/ToolBox";
import "../index.css";
import { useState } from "react";

/**
 * 메인 인덱스 페이지
 */
const IndexPage = () => {

  const [selectedNavItem, setSelectedNavItem] = useState<string>('');

  const handleNavSelect = (navItem: string) => {
    setSelectedNavItem(navItem)
  };

  return (
    <div id="container">
      <MapView2D/>
      <main>
        <div className="logo-wrapper">                
          <h1 className="logo">전라남도 공간정보분석시스템</h1>
        </div>
        <Nav onNavClick={handleNavSelect} selectedNav={selectedNavItem}/>
        <Search />
        <SubContent selectedNav={selectedNavItem} />
        <ToolBox />
      </main>
    </div>
  );
};

export default IndexPage;