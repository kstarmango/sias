import {useRecoilState} from "recoil";
import {activeLayerBox} from "@src/stores/PopupState";
import {useMapContext} from "../../context";
import {useState} from "react";
import Draw, {createBox }from "ol/interaction/Draw";
import {getArea, getDistance, getLength} from "ol/sphere";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {Fill, Stroke, Style} from "ol/style";
import {Overlay} from "ol";
import {activeStatisticPopupState} from "@src/stores/RealEstateStates";

export const ToolBoxMap = () => {

    const [activeStatisticPopup, setActiveStatisticPopup] = useRecoilState(activeStatisticPopupState);
    const [activeMenu, setActiveMenu] = useRecoilState(activeLayerBox);
    const { map } = useMapContext()
    const [drawInteraction, setDrawInteraction] = useState(null);
    const [measureType, setMeasureType] = useState(null);

    const toggleLayerBox = () => {
        setActiveMenu(!activeMenu);
    };

    const toggleBaseMap = () => {
        if (!map) return;
        const layers = map.getLayers().getArray();
        layers.forEach(layer => {
            const currentVisibility = layer.getVisible();
            layer.setVisible(!currentVisibility);
        });
    }

    const toggleMeasure = (type) => {
        if (!map) return;
        if (drawInteraction) {
            map.removeInteraction(drawInteraction);
            setDrawInteraction(null);
            setMeasureType(null);
            if (measureType === type) return;
        }
        const newVectorLayer = new VectorLayer({
            source: new VectorSource(),
            style: new Style({
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.4)',
                }),
                stroke: new Stroke({
                    color: '#d22323',
                    width: 2,
                }),
            }),
        });
        map.addLayer(newVectorLayer);

        const measurementDiv = document.createElement('div');
        measurementDiv.className = 'ol-tooltip ol-tooltip-static';
        measurementDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        measurementDiv.style.paddingLeft = '5px';
        measurementDiv.style.borderRadius = '3px';
        measurementDiv.style.fontSize = '14px';
        measurementDiv.style.fontWeight = 'bold';
        measurementDiv.style.color = '#333';

        const newOverlay = new Overlay({
            element: measurementDiv,
            offset: [0, -10],
            positioning: 'bottom-center',
            stopEvent: false,
            insertFirst: false,
        });
        map.addOverlay(newOverlay);

        const interaction = new Draw({
            source: newVectorLayer.getSource(),
            type: type,
            stopEvent: false,
            stopClick: true,
        });

        interaction.on("drawend", (event) => {
            const geometry = event.feature.getGeometry();
            let measurement; let overlayPosition
            if (type === "LineString") {
                measurement = `${(getLength(geometry) / 1000).toFixed(2)} km`;
                overlayPosition = geometry.getLastCoordinate();
            } else if (type === "Polygon") {
                measurement = `${(getArea(geometry) / 1000000).toFixed(2)} km²`;
                overlayPosition = geometry.getInteriorPoint().getCoordinates();
            }
            const overlay = map.getOverlays().getArray().slice(-1)[0];
            overlay.getElement().innerHTML = `
                <span>${measurement}</span>
                <button style="border: none; color: red; font-weight: bold; cursor: pointer;">x</button>`;
            overlay.setPosition(overlayPosition);

            const closeButton = measurementDiv.querySelector('button');
            closeButton.addEventListener('click', () => {
                map.removeOverlay(newOverlay);
                map.removeLayer(newVectorLayer);
            });
            map.removeInteraction(interaction)
            setDrawInteraction(null);
            setMeasureType(null);
        });
        map.addInteraction(interaction);
        setDrawInteraction(interaction);
        setMeasureType(type);
    };

    const handleReset = () => {
        if (map) {
            map.getOverlays().getArray().slice().forEach(overlay => {
                map.removeOverlay(overlay)
            });
            map.getLayers().getArray().slice().forEach(layer => {
                const preserve = layer.get('preserve');
                if (!preserve) {
                    map.removeLayer(layer)
                }
            });
            map.getInteractions().forEach((interaction, index) => {
                if (index > 8) {
                    map.removeInteraction(interaction);
                    setMeasureType(null)
                }
            });
            setActiveStatisticPopup(false)
        }

    };

    return(
        <div className="toolbox">
            <button type="button" className="map-type" onClick={toggleBaseMap}>
                <div className="toolbox-description-content">
                    <div className="title">배경지도</div>
                </div>
            </button>
            <button type="button" className={`layer ${activeMenu ? "selected" : ""}`} onClick={toggleLayerBox}>
                <div className="toolbox-description-content">
                    <div className="title">레이어</div>
                </div>
            </button>
            <button type="button" className="legend">
                <div className="toolbox-description-content">
                    <div className="title">범례</div>
                </div>
            </button>
            <button type="button" className="reset mar-top-50" onClick={handleReset}>
                <div className="toolbox-description-content">
                    <div className="title">초기화</div>
                </div>
            </button>
            <button type="button" className={`distance ${measureType === "LineString" ? "selected" : ""}`} onClick={() => toggleMeasure('LineString')}>
                <div className="toolbox-description-content">
                    <div className="title">거리측정</div>
                </div>
            </button>
            <button type="button" className={`area ${measureType === "Polygon" ? "selected" : ""}`} onClick={() => toggleMeasure('Polygon')}>
                <div className="toolbox-description-content">
                    <div className="title">면적측정</div>
                </div>
            </button>
            <button type="button" className="information">
                <div className="toolbox-description-content">
                    <div className="title">정보보기</div>
                </div>
            </button>
            <button type="button" className="print">
                <div className="toolbox-description-content">
                    <div className="title">출력</div>
                </div>
            </button>
        </div>
    );
}