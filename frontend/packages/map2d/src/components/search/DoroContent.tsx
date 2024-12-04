import {useEffect, useState} from "react";
import axios from "axios";
import {useMapContext} from "@src/context";
import {fromLonLat, transform} from "ol/proj";
import {getDistance} from "ol/sphere";
import {useRecoilValue} from "recoil";
import {sggState} from "@src/stores/initStates";
import {removeAndAddMarker, toLocation} from "@src/utils/mapUtils";

export const DoroContent = () => {

    const sggs = useRecoilValue(sggState);
    const [selectedSgg, setSelectedSgg] = useState<string>("");
    const [loads, setLoads] = useState<string[]>([]);
    const [filteredLoads, setFilteredLoads] = useState<string[]>([]);
    const [selectedLoad, setSelectedLoad] = useState<string>("");
    const [selectedChar, setSelectedChar] = useState<string>("ㄱ");
    const [startDetail, setStartDetail] = useState("");
    const [endDetail, setEndDetail] = useState("");
    const [results, setResults] = useState([]);
    const { map } = useMapContext();

    const chars = [
        'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ',
        'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
    ];

    useEffect(() => {
        if (sggs.length > 0) {
            setSelectedSgg(sggs[0]);
        }
    }, [sggs]);

    useEffect(() => {
        const fetchLoad = async () => {
            try {
                if (selectedSgg) {
                    const response = await axios.post('/api/test/search/sgg_road', {
                        sgg: selectedSgg,
                    });
                    setLoads(response.data);
                    filtering()
                }
            } catch (error) {
                console.error('Failed to fetch cities:', error);
            }
        };
        fetchLoad();
    }, [selectedSgg]);

    useEffect(() => {
        filtering()
    }, [selectedChar, loads]);

    const filtering = () => {
        let filtered = loads.filter((item) =>
            getInitialConsonant(item) === selectedChar
        );
        setFilteredLoads(filtered)
        setSelectedLoad(filtered[0] || "");
    }

    const getInitialConsonant = (char) => {
        return chars[Math.floor((char.charCodeAt(0) - 0xac00) / 588)];
    };

    const reset = () => {
        setStartDetail("")
        setEndDetail("")
        setResults([])
    }
    const isNumber = (value) => /^[0-9]*$/.test(value);
    const placeSearch = async () => {
        if (startDetail === "") {
            alert("시작 도로명 주소 번호를 입력해주세요.")
            return;
        }
        if (!isNumber(startDetail)) {
            alert("숫자만 입력 가능합니다.")
            return;
        }
        if (endDetail && !isNumber(endDetail)) {
            alert("숫자만 입력 가능합니다.")
            return;
        }
        let detail = startDetail + "-" + endDetail
            try {
                const response = await axios.post("/api/test/search/road_address", {
                    sgg: selectedSgg,
                    keyword: selectedLoad.trim(),
                    detail: detail,
                });
                setResults(response.data)
            } catch (error) {
                if (error.response && error.response.status === 500) {
                    setResults([]);
                }
            }
    };

    const moveToLocation = (point) => {
        toLocation(map, point.x, point.y)
        removeAndAddMarker(map, point.x, point.y)
    }

    return (
        <>
            <div className="search-condition mar-top-20">
                <div className="condition-list">
                    <label>시군구</label>
                    <select className="custom-select" style={{ color: 'white'}} onChange={(e) => setSelectedSgg(e.target.value)} value={selectedSgg || ""}>
                        { sggs.map((city, index)=>(
                            <option key={index}
                            >{city}</option>
                        ))}
                    </select>
                </div>
                <div className="condition-list">
                    <label>선택</label>
                    <select className="custom-select" style={{ color: 'white'}} onChange={(e) => setSelectedChar(e.target.value)} value={selectedChar || ""}>
                        { chars.map((char, index)=>(
                            <option key={index}
                            >{char}</option>
                        ))}
                    </select>
                    <select className="custom-select" style={{ color: 'white'}} onChange={(e) => setSelectedLoad(e.target.value)} value={selectedLoad || ""}>
                        { filteredLoads.map((load, index)=>(
                            <option key={index}
                            >{load}</option>
                        ))}
                    </select>
                </div>
                <div className="condition-list">
                    <label>번호</label>
                    <input type="text" className="width-50" value={startDetail} onChange={(e) => setStartDetail(e.target.value)}/>
                    <span className="smaller">-</span>
                    <input type="text" className="width-50" value={endDetail} onChange={(e) => setEndDetail(e.target.value)}/>
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
                                <span className="keyword">{result.address.road}</span>
                            </div>
                            <div className="address">{result.address.parcel}</div>
                        </li>
                    ))}
                </ul>
                )}
            </div>
        </>
    );
}