import {useEffect, useState} from "react";
import axios from "axios";
import {useMapContext} from "@src/context";
import {fromLonLat, transform} from "ol/proj";
import {getDistance} from "ol/sphere";
import {useRecoilValue} from "recoil";
import {sggState} from "@src/stores/initStates";
import {removeAndAddMarker, toLocation} from "@src/utils/mapUtils";

export const JibunContent = () => {

    const sggs = useRecoilValue(sggState);
    const [emds, setEmds] = useState<string[]>([]);
    const [selectedSgg, setSelectedSgg] = useState<string>("");
    const [selectedEmd, setSelectedEmd] = useState<string>("");
    const [startDetail, setStartDetail] = useState("");
    const [endDetail, setEndDetail] = useState("");
    const [results, setResults] = useState([]);
    const [san, setSan] = useState(false);
    const { map } = useMapContext();

    useEffect(() => {
        if (sggs.length > 0) {
            setSelectedSgg(sggs[0]);  // 초기값으로 첫 번째 항목 설정
        }
    }, [sggs]);


    useEffect(() => {
        const fetchEmd = async () => {
            try {
                if (selectedSgg) {
                    const response = await axios.post('/api/test/search/emd_list', {
                        sgg: selectedSgg,
                        keyword: '',
                        detail: '',
                    });
                    let emds = response.data[0]
                    setEmds(emds);
                    setSelectedEmd(emds[0])
                }
            } catch (error) {
                console.error(`Failed to fetch emds for ${selectedSgg}:`, error);
            }
        };
        fetchEmd();
    }, [selectedSgg]);

    const moveToLocation = (point) => {
        toLocation(map, point.x, point.y)
        removeAndAddMarker(map, point.x, point.y)
    }

    const reset = () => {
        setStartDetail("")
        setEndDetail("")
        setResults([])
    }
    const isNumber = (value) => /^[0-9]*$/.test(value);
    const placeSearch = async () => {
        if (startDetail === "") {
            alert("시작 지번 주소를 입력해주세요.")
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
                const response = await axios.post("/api/test/search/emd_parcel", {
                    sgg: selectedSgg,
                    keyword: selectedEmd,
                    detail: detail,
                });
                const filteredData = san
                    ? response.data.filter(item => {
                        const parcelParts = item.address.parcel.split(" ");
                        return parcelParts.length >= 2 && parcelParts[parcelParts.length - 2] === "산";
                    })
                    : response.data;
                setResults(filteredData)
            } catch (error) {
                if (error.response && error.response.status === 500) {
                    setResults([]);
                }
            }
    };

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
                    <label>읍면동</label>
                    <select className="custom-select" style={{ color: 'white'}} onChange={(e) => setSelectedEmd(e.target.value)} value={selectedEmd || ""}>
                        { emds.map((emd, index)=>(
                            <option key={index}
                            >{emd}</option>
                        ))}
                    </select>
                </div>
                <div className="condition-list">
                    <label><input type="checkbox" checked={san} onChange={(e) => setSan(e.target.checked)}/> 산</label>
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
                                <span className="keyword">{result.address.parcel}</span>
                            </div>
                            <div className="address">{result.road ? result.road : "-"}</div>
                        </li>
                    ))}
                </ul>
                    )}
            </div>
        </>
    )
}