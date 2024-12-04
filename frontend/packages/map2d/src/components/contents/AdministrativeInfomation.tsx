import {useRecoilState} from "recoil";
import { activeMenuState } from "@src/stores/PopupState";

export const AdministrativeInfomation = () => {
    const [activeMenu, setActiveMenu] = useRecoilState(activeMenuState);
    const CloseMenu = (menu) => {
        setActiveMenu(null);
    };

    return (
        <div className="sub-contents" style={{left:"100px"}}>
            <button type="button" className="close sub-content" onClick={CloseMenu}></button>
            <div className="content-wrapper">
                <div className="tabmenu">
                    <button type="button" className="selected"><span className="title">1</span></button>
                    <button type="button"><span className="title">2</span></button>
                    <button type="button"><span className="title">3</span></button>
                </div>
                <div className="information">
                    <div className="title info-icon">행정정보</div>
                    <div className="explanation">테스트입니다..</div>
                </div>
                <div className="button-large-wrapper">
                    <button type="button" className="large-button apply"><span className="txt">분석하기</span></button>
                </div>
            </div>
        </div>
    );
}