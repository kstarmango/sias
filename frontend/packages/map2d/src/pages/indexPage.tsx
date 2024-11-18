import {MapView2D} from "@src/components";
import { Nav } from "@src/components/Nav";
import { Search } from "@src/components/Search";
import { SubContent } from "@src/components/SubContent";
import ToolBox from "@src/components/ToolBox";
import "../index.css";

/**
 * 메인 인덱스 페이지
 */
const IndexPage = () => {
  return (
    <div id="container">
      <MapView2D/>
      <main>
        <div className="logo-wrapper">                
          <h1 className="logo">전라남도 공간정보분석시스템</h1>
        </div>
        <Nav />
        <Search />
        <SubContent />
        <ToolBox />
      </main>
    </div>
  );
};

export default IndexPage;