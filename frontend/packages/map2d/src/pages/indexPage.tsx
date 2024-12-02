import { useState } from "react";

import {MapView2DProvider} from "@src/components";
import { Nav } from "@src/components/common/Nav";
import { Search } from "@src/components/common/Search";
import { SubContent } from "@src/components/common/SubContent";
import ToolBox from "@src/components/common/ToolBox";
import "../index.css";

/**
 * 메인 인덱스 페이지
 */
const IndexPage = () => {

  const [selectedNavItem, setSelectedNavItem] = useState<string>('');

  const handleNavSelect = (navItem: string) => {
    setSelectedNavItem(navItem)
  };

  return (
    <>
      <div id="container">
        <MapView2DProvider>
          <div className="logo-wrapper">                
            <h1 className="logo">전라남도 공간정보분석시스템</h1>
          </div>
          <Nav onNavClick={handleNavSelect} selectedNav={selectedNavItem}/>
          <div id="map" style={{position: 'absolute', width: "100%", height: "100%"}} />
          <main>
            <Search />
            <SubContent selectedNav={selectedNavItem} />
            <ToolBox />
          </main>
        </MapView2DProvider>
      </div>
    </>
  );
};

export default IndexPage;