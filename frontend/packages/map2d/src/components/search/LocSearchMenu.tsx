import {useEffect, useRef, useState} from "react";
import {DetailSearchMenu} from "./DetailSearchMenu";
import axios from "axios";
import {useMapContext} from "@src/context";
import {fromLonLat, transform} from 'ol/proj';
import {getDistance} from "ol/sphere";
import {Feature} from "ol";
import {Point} from "ol/geom";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { removeAndAddMarker, toLocation } from '@src/utils/mapUtils';


export const LocSearchMenu = () => {
    const [activeComponent, setActiveComponent] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState([]);
    const searchRef = useRef(null);
    const { map } = useMapContext();

    const toggleDetailSearch = () => {
        setKeyword("")
        setActiveComponent(activeComponent === "detail" ? null : "detail");
    };

    const handleInputChange = (e) => {
        setKeyword(e.target.value);
    };

    const placeSearch = async () => {
        if (!keyword.trim()) {
            setResults([]);
            setActiveComponent("common")
            return;
        }
        try {
            const response = await axios.post("/api/test/search/place", {
                keyword: keyword.trim(),
            });
            const processedResults = response.data.map((result) => ({
                ...result,
                category: result.category.split(">").pop(),
            }));
            setResults(processedResults);
            setActiveComponent("common")
        } catch (error) {
            if (error.response && error.response.status === 500) {
                setResults([]);
                setActiveComponent("common")
            } else {
                alert("검색 중 오류가 발생했습니다.");
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            placeSearch();
        }
    };

    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setActiveComponent(null);
        }
    };

    const moveToLocation = (point) => {
        toLocation(map, point.x, point.y)
        removeAndAddMarker(map, point.x, point.y)
    };

    useEffect(() => {
        if (activeComponent === "common") {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {document.removeEventListener("mousedown", handleClickOutside);};
    }, [activeComponent]);

    return (
        <div className="location-search">
            <input type="text" id="searchInput" placeholder="검색어를 입력하세요" value={keyword} onChange={handleInputChange} onKeyPress={handleKeyPress}></input>
            <button
                type="button"
                className={`button common-search ${activeComponent === "common" ? "selected" : ""}`}
                onClick={placeSearch}
            ></button>
            <button
                type="button"
                className={`button detail-search ${activeComponent === "detail" ? "selected" : ""}`}
                onClick={toggleDetailSearch}
            ></button>
            {activeComponent === "detail" && <DetailSearchMenu />}
            {activeComponent === "common" &&
                <div className="location-search-result" ref={searchRef}>
                    {results.length === 0 ? (
                        <p>검색 결과가 없습니다.</p>
                    ) : (
                        <ul className="location-search-result-list">
                            {results.map((result, index) => (
                                <li key={index} onClick={() => moveToLocation(result.point)} >
                                    <div className="result">
                                        <div className="title">
                                            <span className="icon-gis"></span>
                                            <span className="keyword">{result.title}</span>
                                            <span className="category">{result.category}</span>
                                        </div>
                                        <div className="address">{result.address.parcel}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>}
        </div>
    );
}