import { activeMenuState } from "@src/stores/PopupState";
import {useRecoilState, useRecoilValue} from "recoil";
import {RealEstate} from "./RealEstate";
import {MobilityAnalysis} from "./MobilityAnalysis";
import {LifestyleInfomation} from "./LifestyleInfomation";
import {AdministrativeInfomation} from "./AdministrativeInfomation";
import {OtherAnalysis} from "./OtherAnalysis";
import {activeStatisticPopupState} from "@src/stores/RealEstateStates";
import {RealEstateAnlyResPopup} from "@src/components/contents/RealEstateAnlyResPopup";


export const SubContents = () => {
    const activeMenu = useRecoilValue(activeMenuState);
    const activeStatisticPopup = useRecoilValue(activeStatisticPopupState);

    const renderContent = () => {
        switch (activeMenu) {
            case "real-estate":
                return <RealEstate/>;
            case "mobility-analysis":
                return <MobilityAnalysis/>;
            case "lifestyle-information":
                return <LifestyleInfomation/>;
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
            return <RealEstateAnlyResPopup/>;
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