import {useRecoilState} from "recoil";
import { activeMenuState } from "@src/stores/PopupState";
import { LifeService } from "../subcontent/life/LifeService";
import { LifeVulnArea } from "../subcontent/life/LifeVulnArea";
import { LifeTrafficAccidentArea } from "../subcontent/life/LifeTrafficAccidentArea";
import { LifeDistanceFac } from "../subcontent/life/LifeDistanceFac";
import { useState } from "react";

export const LifeStyleInfomation = () => {
    const [activeMenu, setActiveMenu] = useRecoilState(activeMenuState);
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>('lifeService');

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
                            <button
                                key={key}
                                type="button" 
                                className={activeSubMenu === key ? 'selected' : ''} 
                                onClick={() => handleMenuClick(key)}>
                                <span className="title">{value}</span>
                            </button>
                        ))
                    }
                </div>
                {
                    activeSubMenu === 'lifeService' 
                        ? <LifeService/> : 
                    activeSubMenu === 'vulnArea' 
                        ? <LifeVulnArea/> :     
                    activeSubMenu === 'traffic' 
                        ? <LifeTrafficAccidentArea/> :
                    activeSubMenu === 'distanceFac'
                        ? <LifeDistanceFac/> :
                    null
                }
            </div>
        </div>
    );
}

const TAB_LIST = {
    lifeService: '생활서비스 조회',
    vulnArea: '취약지역 조회',
    traffic: '교통사고 다발지역 조회',
    distanceFac: '최단거리 분석'
}