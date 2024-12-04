import { activeMenuState } from "@src/stores/PopupState";
import {useRecoilValue} from "recoil";

import {MobilityAnalysis} from "./MobilityAnalysis";
import {AdministrativeInfomation} from "./AdministrativeInfomation";
import {activeStatisticPopupState} from "@src/stores/RealEstateStates";
import { LifeStyleInfomation } from "./LifeStyleInfomation";
import { OtherAnalysis } from "./OtherAnalysis";


export const SubContents = () => {
    const activeMenu = useRecoilValue(activeMenuState);
    const activeStatisticPopup = useRecoilValue(activeStatisticPopupState);

    const renderContent = () => {
        switch (activeMenu) {
            case "real-estate":
                // return <RealEstate/>;
                return null;
            case "mobility-analysis":
                return <MobilityAnalysis/>;
            case "lifestyle-information":
                return <LifeStyleInfomation/>;
            case "administrative-information":
                return <AdministrativeInfomation/>;
            case "other-analysis":
                return <OtherAnalysis/>;
            default:
                return null;
        }
    };

    const renderPopup = () => {
        if (activeStatisticPopup) {
            // return <RealEstateAnlyResPopup/>;
            return null;
        } else {
            return null;
        }
    };

    return (
        <>
            {renderContent()}
            {renderPopup()}
        </>
    )
}