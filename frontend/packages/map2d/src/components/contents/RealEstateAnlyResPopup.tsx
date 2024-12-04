import {useRecoilState, useRecoilValue} from "recoil";
import {activeStatisticPopupState, defaultColorsState, landAdminAnalysisState} from "@src/stores/RealEstateStates";
import Highcharts from 'highcharts';
import {useEffect} from "react";
import { defaultChartOptions } from '@src/config/chartOptions';
import {useMapContext} from "@src/context";
import VectorSource from "ol/source/Vector";
import {GeoJSON, WKT} from "ol/format";
import {Fill, Stroke, Style} from "ol/style";
import VectorLayer from "ol/layer/Vector";

export const RealEstateAnlyResPopup = () => {

    // const [activeStatisticPopup, setActiveStatisticPopup] = useRecoilState(activeStatisticPopupState);
    // const [defaultColors, setDefaultColors] = useRecoilState(defaultColorsState);
    // const landAdminAnalysis = useRecoilValue(landAdminAnalysisState);
    // const { map } = useMapContext();

    // useEffect(() => {
    //     const chartData = Object.values(landAdminAnalysis).map(item => ({
    //         name: item.codeName,
    //         y: item.totalCount
    //     }));
    //     const options = { ...defaultChartOptions, series: [{ name: '필지수', colorByPoint: true, data: chartData }] }
    //     Highcharts.chart('chart-container', options);
    // }, [landAdminAnalysis]);

    // useEffect(() => {
    //     const layers = []; // 새로 추가될 레이어 저장
    //     const randomColors = {};
    //     let allExtents = [];

    //     // 각 데이터 항목에 대해 레이어 생성
    //     Object.entries(landAdminAnalysis).forEach(([key, item]) => {
    //         if (!item.geomList || item.geomList.length === 0) return; // geomList가 없는 경우 스킵

    //         // 벡터 소스 생성
    //         const wktFormat = new WKT();
    //         const vectorSource = new VectorSource();
    //         item.geomList.forEach((geom) => {
    //             const feature = wktFormat.readFeature(geom, {
    //                 dataProjection: 'EPSG:5186', // 데이터 좌표계
    //                 featureProjection: 'EPSG:5186', // 맵 좌표계 (변환 없음)
    //             });
    //             vectorSource.addFeature(feature);
    //         });

    //         if (!randomColors[item.code]) {
    //             randomColors[item.code] = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`;
    //         }

    //         // 스타일 지정
    //         const vectorStyle = new Style({
    //             fill: new Fill({
    //                 color: randomColors[item.code] || 'rgba(0, 0, 0, 0.5)', // 기본 색상
    //             }),
    //             stroke: new Stroke({
    //                 color: 'rgba(0, 0, 0, 1)', // 윤곽선 색상
    //                 width: 1,
    //             }),
    //         });

    //         const vectorLayer = new VectorLayer({
    //             source: vectorSource,
    //             style: vectorStyle,
    //             minZoom: 16.5,
    //         });
    //         vectorLayer.set('request', true)
    //         layers.push(vectorLayer);
    //         map.addLayer(vectorLayer); // 맵에 레이어 추가

    //         const extent = vectorSource.getExtent();
    //         allExtents.push(extent); // extent 저장
    //     });

    //     if (allExtents.length > 0) {
    //         const combinedExtent = allExtents.reduce((acc, extent) => {
    //             return [
    //                 Math.min(acc[0], extent[0]), // 최소 X
    //                 Math.min(acc[1], extent[1]), // 최소 Y
    //                 Math.max(acc[2], extent[2]), // 최대 X
    //                 Math.max(acc[3], extent[3]), // 최대 Y
    //             ];
    //         });

    //         map.getView().fit(combinedExtent, {
    //             padding: [50, 50, 50, 50], // 가장자리에 여백을 둘 수도 있음
    //         });
    //         map.getView().setZoom(16.9)
    //     }

    //     // 컴포넌트 언마운트 시 레이어 제거
    //     return () => {
    //         map.getLayers().getArray().slice().forEach(layer => {
    //             const request = layer.get('request');
    //             if (request) {
    //                 map.removeLayer(layer)
    //             }
    //         });
    //     };
    // }, [landAdminAnalysis, map]);

    // return (
    //     <div className="popup popup-w-340">
    //         <button type="button" className="close popup-close" onClick={() => setActiveStatisticPopup(false)}></button>
    //         <h2><span className="txt">분석결과</span></h2>
    //         <div className="content-wrapper mar-top-20">
    //             <div className="chart-bg">
    //                 <div id="chart-container" style={{alignItems:'center'}}></div>
    //             </div>
    //             <h3 className="white-title mar-top-10">소유자 필지정보</h3>
    //             <table className="basic-list">
    //                 <tbody>
    //                 {Object.entries(landAdminAnalysis).map(([key, item]) => (
    //                     <tr key={key}>
    //                         <td>{item.codeName}</td>
    //                         <td>{item.totalCount}</td>
    //                     </tr>
    //                 ))}
    //                 </tbody>
    //             </table>
    //             <div className="button-wrapper">
    //                 <button type="button" className="normal-button print"></button>
    //                 <button type="button" className="normal-button apply">자료 다운로드</button>
    //             </div>
    //         </div>
    //     </div>
    // )

}