import {useRecoilState} from "recoil";
import { activeMenuState } from "@src/stores/PopupState";
import { useState } from "react";
import { AreaSales } from "../subcontent/comm/AreaSales";
import { CommPop } from "../subcontent/comm/CommPop";
import { FestivalInflux } from "../subcontent/comm/FestivalInflux";
import { FestivalRevenue } from "../subcontent/comm/FestivalRevenue";
import { Location } from "../subcontent/comm/Location";

export const OtherAnalysis = () => {
    const [activeMenu, setActiveMenu] = useRecoilState(activeMenuState);
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>('festivalInflux');

    const CloseMenu = (menu) => {
        setActiveMenu(null);
    };

    const handleMenuClick = (menu: string) => {
        setActiveSubMenu(menu);
    }

    return (
        <div className="sub-contents" style={{left:"100px"}}>
            <button type="button" className="close sub-content" onClick={CloseMenu}></button>
            <div className="content-wrapper">
                <div className="tabmenu">
                    {
                        Object.entries(TAB_LIST).map(([key, value]) => (
                            <button key={key} type="button" className={activeSubMenu === key ? 'selected' : ''} onClick={() => handleMenuClick(key)}><span className="title">{value}</span></button>
                        ))
                    }
                </div>
               {
                activeSubMenu === 'areaSales' ? <AreaSales/> :
                activeSubMenu === 'commPop' ? <CommPop/> :
                activeSubMenu === 'festivalInflux' ? <FestivalInflux/> :
                activeSubMenu === 'festivalRevenue' ? <FestivalRevenue/> :
                activeSubMenu === 'location' ? <Location/> :
                null
               }
            </div>
        </div>
    );
}

const TAB_LIST = {
    festivalInflux: '축제 유입 분석',
    festivalRevenue: '축제 매출 분석',
    areaSales: '상권 매출 조회',
    commPop: '상권 인구 분석',
    location: '지점 분석',
}