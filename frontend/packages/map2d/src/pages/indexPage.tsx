import {MapView2D} from "@src/components";
import {NavMenu} from "@src/components";
import {LocSearchMenu} from "@src/components";
import {ToolBoxMap} from "@src/components";
import {ToolBoxZoom} from "@src/components";
import {SubContents} from "@src/components";
import {LayerBox} from "@src/components";

/**
 * 메인 인덱스 페이지
 */
const IndexPage = () => {
  return (
    <main>
        <MapView2D/>
        <NavMenu/>
        <SubContents/>
        <LocSearchMenu/>
        <LayerBox/>
        <ToolBoxMap/>
        <ToolBoxZoom/>
    </main>
);
};

export default IndexPage;