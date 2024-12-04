import {Tile as TileLayer} from 'ol/layer';
import {XYZ} from "ol/source";

function vworldExportBaseMapLayer(apiKey, type, visible, ext) {
    let vworldExportLayer = new TileLayer({
        title: "VWorldMap"+type,
        visible: visible,
        zindex: 10,
        source: new XYZ({
            url:"http://api.vworld.kr/req/wmts/1.0.0/" + apiKey + "/"+type+"/{z}/{y}/{x}."+ext,
        }),
    });
    vworldExportLayer.set('preserve', true);
    return vworldExportLayer
}

export {vworldExportBaseMapLayer}