import React from "react";
import { useRecoilState } from "recoil";
import { activeMenuState } from "@src/stores/PopupState";

export const NavMenu = () => {

    const [activeMenu, setActiveMenu] = useRecoilState(activeMenuState);

    const handleButtonClick = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu); // 같은 버튼 클릭 시 끄기
    };

    return (
        <>
            <div className="logo-wrapper" style={{position:"absolute"}}>
                <h1 className="logo">전라남도 공간정보분석시스템</h1>
            </div>
            <nav style={{position:"absolute", top:"45px"}}>
                <button type="button" className={activeMenu === "real-estate" ? "selected" : ""}
                        onClick={() => handleButtonClick("real-estate")}>
                    <span className={`icon real-estate ${activeMenu === "real-estate" ? "selected" : ""}`}></span>
                    <span className="title">부동산<br/>정보</span>
                </button>
                <button type="button" className={activeMenu === "mobility-analysis" ? "selected" : ""}
                        onClick={() => handleButtonClick("mobility-analysis")}>
                    <span className={`icon mobility-analysis ${activeMenu === "mobility-analysis" ? "selected" : ""}`}></span>
                    <span className="title">유동인구<br/>분석</span>
                </button>
                <button type="button" className={activeMenu === "lifestyle-information" ? "selected" : ""}
                        onClick={() => handleButtonClick("lifestyle-information")}>
                    <span className={`icon lifestyle-information ${activeMenu === "lifestyle-information" ? "selected" : ""}`}></span>
                    <span className="title">생활정보</span>
                </button>
                <button type="button" className={activeMenu === "administrative-information" ? "selected" : ""}
                        onClick={() => handleButtonClick("administrative-information")}>
                    <span className={`icon administrative-information ${activeMenu === "administrative-information" ? "selected" : ""}`}></span>
                    <span className="title">행정정보</span>
                </button>
                <button type="button" className={activeMenu === "other-analysis" ? "selected" : ""}
                        onClick={() => handleButtonClick("other-analysis")}>
                    <span className={`icon other-analysis ${activeMenu === "other-analysis" ? "selected" : ""}`}></span>
                    <span className="title">기타분석</span>
                </button>
            </nav>
        </>
        )
    ;
}