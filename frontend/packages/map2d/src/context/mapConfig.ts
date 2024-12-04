import { View } from 'ol';
import { defaults as defaultControls } from 'ol/control';
import { getBaseMapArray } from "../utils/baseMapArray";
import proj4 from 'proj4';
import {register} from "ol/proj/proj4";
import {fromLonLat, get as getProjection, transform} from 'ol/proj';

proj4.defs(
    'EPSG:5186',
    '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs'
);
register(proj4);
// const epsg5186 = getProjection('EPSG:5186');

const defaultMapConfig = (apiKey) => ({

    layers: getBaseMapArray(apiKey),
    view: new View({
        projection: "EPSG:5186",
        center: transform([126.7, 34.8], 'EPSG:4326', 'EPSG:5186'),
        zoom: 9,
        maxZoom: 19,
        minZoom: 8,
    }),
    overlays: [],
    controls: defaultControls({ zoom: false }),
});

export default defaultMapConfig;