import {vworldExportBaseMapLayer} from './vworldExportBaseMapLayer';

function getBaseMapArray(apiKey) {
    const baseMapArray = [
        vworldExportBaseMapLayer(apiKey, "Base", true, 'png'),
        vworldExportBaseMapLayer(apiKey, "Satellite", false, 'jpeg'),
    ];

    return baseMapArray
}

export {getBaseMapArray}