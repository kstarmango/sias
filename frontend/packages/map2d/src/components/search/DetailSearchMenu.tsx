import {useState} from "react";
import {JibunContent} from "./JibunContent";
import {DoroContent} from "./DoroContent";
import {NameContent} from "./NameContent";

export const DetailSearchMenu = () => {
    const [selectedTab, setSelectedTab] = useState("지번");

    const renderContent = () => {
        switch (selectedTab) {
            case "지번":
                return <JibunContent/>;
            case "도로명":
                return <DoroContent/>;
            case "명칭":
                return <NameContent />;
            default:
                return null;
        }
    };

    return (
        <div className="location-search-result">
            <div className="sub-tabmenu">
                <button type="button" onClick={() => setSelectedTab("지번")} className={selectedTab === "지번" ? "selected" : ""}>지번</button>
                <button type="button" onClick={() => setSelectedTab("도로명")} className={selectedTab === "도로명" ? "selected" : ""}>도로명</button>
                <button type="button" onClick={() => setSelectedTab("명칭")} className={selectedTab === "명칭" ? "selected" : ""}>명칭</button>
            </div>
            {renderContent()}
        </div>
    )
}