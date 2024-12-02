import "ol/ol.css";
import Map from "ol/map";
import proj4 from 'proj4'
import View from "ol/view";
import TileLayer from "ol/layer/tile";
import OSM from "ol/source/osm";
import {createContext, useEffect, useState} from "react";
import {MapOptions} from "ol/Map";
import {register} from 'ol/proj/proj4'
import Interaction from "ol/interaction/Interaction";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import axios from "axios";
import {useAuth} from "@shared/auth";
import GeoJSON from "ol/format/GeoJSON";
import Feature from "ol/Feature";
import { Geometry, LineString } from "ol/geom";
import type { FeatureLike } from 'ol/Feature';
import 'ol-ext/dist/ol-ext.css';
import FlowLine from "ol-ext/style/FlowLine.js";
import Style from "ol/style/Style";
import { midpoint } from "@turf/turf";

proj4.defs([
	['EPSG:4326', '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs'],
	[
		'EPSG:3857',
		'+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs',
	],
	[
		'EPSG:5173',
		'+proj=tmerc +lat_0=38 +lon_0=125.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs',
	],
	[
		'EPSG:5174',
		'+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs',
	],
	[
		'EPSG:5175',
		'+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=550000 +ellps=bessel +units=m +no_defs',
	],
	[
		'EPSG:5176',
		'+proj=tmerc +lat_0=38 +lon_0=129.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs',
	],
	[
		'EPSG:5177',
		'+proj=tmerc +lat_0=38 +lon_0=131.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs',
	],
	[
		'EPSG:5178',
		'+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=bessel +units=m +no_defs',
	],
	[
		'EPSG:5179',
		'+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
	],
	[
		'EPSG:5180',
		'+proj=tmerc +lat_0=38 +lon_0=125 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
	],
	[
		'EPSG:5181',
		'+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
	],
	[
		'EPSG:5182',
		'+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=550000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
	],
	[
		'EPSG:5183',
		'+proj=tmerc +lat_0=38 +lon_0=129 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
	],
	[
		'EPSG:5184',
		'+proj=tmerc +lat_0=38 +lon_0=131 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
	],
	[
		'EPSG:5185',
		'+proj=tmerc +lat_0=38 +lon_0=125 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
	],
	[
		'EPSG:5186',
		'+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
	],
	[
		'EPSG:5187',
		'+proj=tmerc +lat_0=38 +lon_0=129 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
	],
	[
		'EPSG:5188',
		'+proj=tmerc +lat_0=38 +lon_0=131 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
	],
	['EPSG:32651', '+proj=utm +zone=51 +ellps=WGS84 +datum=WGS84 +units=m +no_defs'],
	['EPSG:32652', '+proj=utm +zone=52 +ellps=WGS84 +datum=WGS84 +units=m +no_defs'],
]);

register(proj4);

export interface MapView2DProps extends MapOptions {}

export const MapContext = createContext<{
	map: Map | null,
	interactions: Interaction[],
	setMap: (map: Map | null) => void,
	setInteractions: (interactions: Interaction[]) => void
}>({
	map: null,
	interactions: [],
	setMap: () => {},
	setInteractions: () => {}
});

export const MapView2DProvider = ({children}: {children: React.ReactNode}) => {

    const {authenticated} = useAuth();
    const [map, setMap] = useState<Map | null>(null);
    const [interactions, setInteractions] = useState<Interaction[]>([]);

		useEffect(() => {
      const initMap = new Map({
				target: "map",
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
					zoom: 8,
          center: [259823, 384192],
          projection: 'EPSG:5186'
        }),
      });
			
      setMap(initMap);	
			
			return () => {
				initMap.setTarget(undefined);
			}
    }, []);

  return (
		<MapContext.Provider 
			value={{
				map,
				interactions,
				setMap, 
				setInteractions
			}}
		>	
			{children}
		</MapContext.Provider>
  );
}
