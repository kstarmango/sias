import '../../../public/css/spaceware.css'
import React, {useEffect, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import { activeMenuState } from "@src/stores/PopupState";
import {useMapContext} from "@src/context";
import {TileWMS} from "ol/source";
import TileLayer from "ol/layer/Tile";
import axios from "axios";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Draw, {createBox} from "ol/interaction/Draw";
import {Polygon} from "ol/geom";
import {WKT} from "ol/format";
import {sggState} from "@src/stores/initStates";
import {activeStatisticPopupState, landAdminAnalysisState} from "@src/stores/RealEstateStates";

export const RealEstate = () => {
    const { map } = useMapContext();
    const sggs = useRecoilValue(sggState);
    const [landAdminAnalysis, setLandAdminAnalysis] = useRecoilState(landAdminAnalysisState);
    const [activeStatisticPopup, setActiveStatisticPopup] = useRecoilState(activeStatisticPopupState);
    const [emds, setEmds] = useState<[string[]]>([]);
    const [selectedTypeOption, setSelectedTypeOption] = useState("owner");
    const [selectedAreaOption, setSelectedAreaOption] = useState("umdCode");
    const [selectedPolygon, setSelectedPolygon] = useState("");
    const [selectedSgg, setSelectedSgg] = useState<string>("");
    const [selectedEmd, setSelectedEmd] = useState<string>({name: null, code:null});
    const [drawLayer, setDrawLayer] = useState(null);

    useEffect(() => {
        if (sggs.length > 0) {
            setSelectedSgg(sggs[0]);
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
                    const processedData = response.data[0].map((emdName, index) => [emdName, response.data[1][index]]);
                    setEmds(processedData);
                    setSelectedEmd({ name: processedData[0][0], code: processedData[0][1] })
                }
            } catch (error) {
                console.error(`Failed to fetch emds for ${selectedSgg}:`, error);
            }
        };
        fetchEmd();
    }, [selectedSgg]);

    useEffect(() => {
        let wmsSource = new TileWMS({
            url: 'http://dj.gaia3d.com:25050/geoserver/jn/wms',
            params: {
                VERSION: "1.1.1",
                LAYERS: "lp_pa_cbnd",
                TILED: true,
            },
            serverType: 'geoserver'
        })
        let wmsLayer = new TileLayer({
            source: wmsSource,
            title: 'realEstate',
            // minZoom: 14.5,
        })
        wmsLayer.set('preserve', true);
        map.addLayer(wmsLayer);
        console.log(map.getView().getZoom())

        return () => {
            map.removeLayer(wmsLayer);
            map.getLayers().getArray().slice().forEach(layer => {
                const preserve = layer.get('request');
                if (preserve) {
                    map.removeLayer(layer)
                }
            });
            setActiveStatisticPopup(false)
        };
    }, [map]);

    const [activeMenu, setActiveMenu] = useRecoilState(activeMenuState);
    const CloseMenu = (menu) => {
        setActiveMenu(null); // 같은 버튼 클릭 시 끄기
    };

    const [drawInteraction, setDrawInteraction] = useState(null);
    const [measureType, setMeasureType] = useState(null);
    const handleReset = () => {
        if (map) {
            if (drawLayer) {
                map.removeLayer(drawLayer);
                setDrawLayer(null);
            }
            if (drawInteraction) {
                map.removeInteraction(drawInteraction);
                setDrawInteraction(null);
                setMeasureType(null);
            }
        }
    };

    const toggleMeasure = (type) => {
        if (!map) return;
        if (drawInteraction) {
            map.removeInteraction(drawInteraction);
            setDrawInteraction(null);
            setMeasureType(null);
            if (measureType === type) return;
        }
        map.getLayers().getArray().slice().forEach(layer => {
            const request = layer.get('request');
            if (request) {
                map.removeLayer(layer)
            }
        });
        const newVectorLayer = new VectorLayer({
            source: new VectorSource(),
        });
        newVectorLayer.set('request', true)
        map.addLayer(newVectorLayer);
        setDrawLayer(newVectorLayer)

        const typeMapping = {
            Square: { interactionType: "Circle", geometryFunction: createBox() },
            Circle: { interactionType: "Circle", geometryFunction: null },
            Polygon: { interactionType: "Polygon", geometryFunction: null }
        };
        const { interactionType, geometryFunction } = typeMapping[type] || {};
        const interaction = new Draw({
            source: newVectorLayer.getSource(),
            type: interactionType,
            stopEvent: false,
            stopClick: true,
            geometryFunction: geometryFunction,
        });
        interaction.on("drawend", (event) => {
            let geometry = event.feature.getGeometry();
            const wktFormat = new WKT();
            function circleToPolygon(circle, sides = 64) {
                const coordinates = [];
                const center = circle.getCenter();
                const radius = circle.getRadius();
                for (let i = 0; i < sides; i++) {
                    const angle = (i * 2 * Math.PI) / sides;
                    const x = center[0] + radius * Math.cos(angle);
                    const y = center[1] + radius * Math.sin(angle);
                    coordinates.push([x, y]);
                }
                coordinates.push(coordinates[0]);
                return new Polygon([coordinates]);
            }
            if (type === "Circle") {
                geometry = circleToPolygon(geometry);
            }
            setSelectedPolygon(wktFormat.writeGeometry(geometry))
            setDrawInteraction(null);
            setMeasureType(null);
            map.removeInteraction(interaction)
        });
        map.addInteraction(interaction);
        setDrawInteraction(interaction);
        setMeasureType(type);
    };

    const handleAnalysis = async () => {
        const hasRequestProperty = map.getLayers().getArray().some(layer => layer.get('request'));
        if (selectedAreaOption === "userDraw" && !hasRequestProperty) {
            alert("사용자 영역을 선택해주세요.")
            return;
        }
        console.log(selectedTypeOption)
        console.log(selectedAreaOption)
        try {
            const response = await axios.post("/api/test/analysis/landuse", {
                "analysisType" : selectedTypeOption,
                "regionType" : selectedAreaOption,
                "data" : selectedAreaOption === "umdCode" ? selectedEmd.code : selectedPolygon
            });
            setLandAdminAnalysis(response.data)
            console.log(response.data)
            setActiveStatisticPopup(true)
        } catch (error) {
            alert("검색 중 오류가 발생했습니다.");
        }
    };

    const handleSelectChange = (e) => {
        const selected = emds.find(([_, code]) => code === e.target.value);
        setSelectedEmd({ name: selected[0], code: selected[1] });
    };

    return (
        <div className="sub-contents">
            <button type="button" className="close sub-content" onClick={CloseMenu}></button>
            <div className="content-wrapper">
                <div className="tabmenu">
                    <button type="button" className="selected"><span className="title">토지행정</span></button>
                    <button type="button"><span className="title">토지거래현황</span></button>
                    <button type="button"><span className="title">지가변동률</span></button>
                </div>
                <div className="information">
                    <div className="title info-icon">토지행정 서비스</div>
                    <div className="explanation">지적을 검색하여 일필지 정보를 검색하고 조회하는 서비스입니다.</div>
                </div>
                <div className="analysis-condition-wrapper mar-top-30">
                    <div className="analysis-title">분석타입</div>
                    <div className="analysis-content">
                        <label className="custom-radio">
                            <input type="radio" name="option1" value="owner" checked={selectedTypeOption === "owner"} onChange={(e) => setSelectedTypeOption(e.target.value)}></input>
                            <span className="radio-mark"></span> 소유자
                        </label>
                        <label className="custom-radio">
                            <input type="radio" name="option1" value="jimk" checked={selectedTypeOption === "jimk"} onChange={(e) => setSelectedTypeOption(e.target.value)}></input>
                            <span className="radio-mark"></span> 지목
                        </label>
                    </div>
                </div>
                <div className="analysis-condition-wrapper mar-top-30">
                    <div className="analysis-title">영역설정</div>
                    <div className="analysis-content">
                        <label className="custom-radio">
                            <input type="radio" name="option2" value="umdCode" checked={selectedAreaOption === "umdCode"} onChange={(e) => setSelectedAreaOption(e.target.value)}/>
                            <span className="radio-mark"></span> 행정구역
                        </label>
                        <label className="custom-radio">
                            <input type="radio" name="option2" value="userDraw" checked={selectedAreaOption === "userDraw"} onChange={(e) => setSelectedAreaOption(e.target.value)}></input>
                            <span className="radio-mark"></span> 사용자영역
                        </label>
                    </div>
                    {selectedAreaOption === "umdCode" ? (
                        <>
                            <div className="clear-both search-condition mar-top-10">
                                <div className="condition-list mar-left-13">
                                    <label>시군구</label>
                                    <select className="custom-select" style={{ color: 'white'}} onChange={(e) => setSelectedSgg(e.target.value)} value={selectedSgg || ""}>
                                        { sggs.map((city, index)=>(
                                            <option key={index}
                                            >{city}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="condition-list mar-left-13">
                                    <label>읍면동</label>
                                    <select className="custom-select" style={{ color: 'white'}} onChange={handleSelectChange} value={selectedEmd.code || ""}>
                                        {emds.map(([emdName, emdCode]) => (
                                            <option key={emdCode} value={emdCode}>
                                                {emdName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </>
                    ) : (
                    <div className="clear-both condition-area mar-top-10">
                        <div className="list-wrapper">
                            <button type="button" className={`circle ${measureType === 'Circle' ? 'active' : ''}`} onClick={() => toggleMeasure('Circle')}></button>
                            <button type="button" className={`square ${measureType === 'Square' ? 'active' : ''}`} onClick={() => toggleMeasure('Square')}></button>
                            <button type="button" className={`pentagon ${measureType === 'Polygon' ? 'active' : ''}`} onClick={() => toggleMeasure('Polygon')}></button>
                        </div>
                        <div className="button-area">
                            <button type="button" className="reset" onClick={handleReset}>초기화</button>
                        </div>
                    </div>
                    )}
                </div>
                <div className="button-large-wrapper">
                    <button type="button" className="large-button apply"><span className="txt" onClick={handleAnalysis}>분석하기</span></button>
                </div>
            </div>
        </div>
    );
}