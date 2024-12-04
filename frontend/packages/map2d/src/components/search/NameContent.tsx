import axios from "axios";
import {useRef, useState} from "react";
import {useMapContext} from "@src/context";
import {removeAndAddMarker, toLocation} from "@src/utils/mapUtils";

export const NameContent = () => {

    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState([]);
    const { map } = useMapContext();

    const placeSearch = async () => {
        if (!keyword.trim()) {
            setResults([]);
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
        } catch (error) {
            if (error.response && error.response.status === 500) {
                setResults([]);
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
    const reset = () => {
        setKeyword("")
        setResults([])
    }

    const moveToLocation = (point) => {
        toLocation(map, point.x, point.y)
        removeAndAddMarker(map, point.x, point.y)
    }

    return (
        <>
            <>
                <div className="search-condition mar-top-20">
                    <div className="condition-list">
                        <label>명칭</label>
                        <input type="text" className="width-240" value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyPress={handleKeyPress}/>
                    </div>
                </div>
                <div className="button-wrapper">
                    <button type="button" className="normal-button cancel" onClick={reset}>초기화</button>
                    <button type="button" className="normal-button apply" onClick={placeSearch}>검색</button>
                </div>
                <div className="result-list-wrapper">
                    {results.length === 0 ? (
                        <p>검색 결과가 없습니다.</p>
                    ) : (
                    <ul>
                        {results.map((result, index) => (
                        <li key={index} onClick={() => moveToLocation(result.point)} >
                            <div className="title">
                                <span className="icon-gis"></span>
                                <span className="keyword">{result.title}</span>
                            </div>
                            <div className="address">{result.address.parcel}</div>
                        </li>
                        ))}
                    </ul>
                        )}
                </div>
            </>
        </>
    )
}