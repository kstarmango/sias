import { Map, Feature } from 'ol';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {transform} from "ol/proj";
import {getDistance} from "ol/sphere";

export const removeAndAddMarker = (map: any, x: number, y: number) => {

    map.getLayers().getArray().slice().forEach(layer => {
        const markerLayer = layer.get('marker');
        if (markerLayer) {
            map.removeLayer(layer);
        }
    });

    const marker = new Feature({
        geometry: new Point([x, y]),
    });

    const vectorSource = new VectorSource({
        features: [marker],
    });

    const vectorLayer = new VectorLayer({
        source: vectorSource,
    });

    vectorLayer.set('marker', true);
    map.addLayer(vectorLayer);
};

export const toLocation = (map: any, x: number, y: number) => {
    const view = map.getView();
    const start = transform(view.getCenter(), 'EPSG:5186', 'EPSG:4326');
    const end = transform([x*1, y*1], 'EPSG:5186', 'EPSG:4326');
    const distance = getDistance(start, end);
    const thresholdDistance = 3000;
    if (distance < thresholdDistance) {
        view.animate({
            center: [x, y],
            zoom: 18,
            duration: 500,
        });
    } else {
        view.setCenter([x*1, y*1]);
        view.setZoom(18);
    }
};