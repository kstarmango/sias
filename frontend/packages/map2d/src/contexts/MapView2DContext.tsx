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
import { Geometry } from "ol/geom";
import type { FeatureLike } from 'ol/Feature';
import 'ol-ext/dist/ol-ext.css';
import FlowLine from "ol-ext/style/FlowLine.js";
import {cspline} from "ol/geom/Geometry";
import Style from "ol/style/Style";

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
				// test

				try {
					const fetchFestivalInflowData = async () => {
						const geoserverUrl = import.meta.env.VITE_GEOSERVER_URL;
						
						const params = new URLSearchParams({
							service: 'WFS',
							version: '1.1.0',
							request: 'GetFeature',
							typeName: 'jn:jn_festival_inflow_age', 
							outputFormat: 'application/json',
							srs: 'EPSG:5186',
							viewparams: 'x_coord:146823.5;y_coord:244192.7;start_date:20230927;end_date:20230929;radius:2000;des_cd:46'
						})

						const response = await axios.get(`${geoserverUrl}?${params.toString()}`);
						if(!response.data){
							throw new Error('네트워크 응답이 좋지 않습니다.')
						}
						return response.data;
					}

					const styleFunction = (topTenFeatures: any) => { 
						const topTenFeaturesIdList = topTenFeatures.map(feature => feature.id);

						function mapValuesToRange(values): number[] {
							const minValue = Math.min(...values)
							const maxValue = Math.max(...values)
					
							const widthList = (widthRange) => values.map(value => {
								const range = maxValue - minValue
								if (range === 0) return 2 // 모든 값이 같을 경우
								return Math.floor(((value - minValue) / range) * widthRange) + 2
							})
							
							return [widthList(36), widthList(13)];
						}

						const widthList = mapValuesToRange(topTenFeatures.map(feature => feature.properties.pop_all));
						
						return (feature: Feature<Geometry>) => {

							const opt = {
								tension: 0.7, 
								pointsPerSeg: 10,
								normalize: false
							};

							const csp = feature.getGeometry()?.cspline(opt);

							const cspStyle = new Style({
								geometry: csp
							});
	
							// const t = new Style({
							// 	image: new ol.style.Circle({ stroke:new ol.style.Stroke({color:"blue",width:1}), radius:1 }),
							// 	geometry: ($("#dpt").prop("checked") && $("#cspline").prop("checked")) ? new ol.geom.MultiPoint(csp.getCoordinates()) : null
							// });
	
							// const d = new ol.style.Style({
							// 	image: new ol.style.Circle({ stroke:new ol.style.Stroke({color:"red",width:4}), radius:2 }),
							// 	geometry: new ol.geom.MultiPoint(f.getGeometry().getCoordinates())
							// });

							const colorList = ['#800026cc', '#bd0026cc', '#e31a1ccc', '#fc4e2acc', '#fd8d3ccc', '#feb24ccc', '#fed976cc', '#ffeda0cc', '#ffffcccc', '#fffffcc'];
							const featureIndex = topTenFeaturesIdList.indexOf(feature.getId());
							const flowLine = new FlowLine({
								color: colorList[featureIndex],
								color2: colorList[featureIndex],
								width: widthList[0][featureIndex],
								width2: widthList[1][featureIndex],
								arrow: 1,
						  });

							return [flowLine];
						}
					}

					fetchFestivalInflowData().then(data => {
						let featureData = data;

						const topTenFeatures = featureData.features
							.sort((a, b) => b.properties.pop_all - a.properties.pop_all) 
							.slice(0, 10);

						featureData.features = topTenFeatures;
						// 데이터 시각화

						const featureReader = new GeoJSON();
						const features = featureReader.readFeatures(featureData) as Feature<Geometry>[];
						const vectorLayer = new VectorLayer({
							source: new VectorSource({
								features: features
							}),
							style: styleFunction(topTenFeatures)
						});

						initMap.addLayer(vectorLayer as any);

					}).catch(error => {
						console.error(error);
					})

				} catch (error) {
					console.error(error);
				}

			return () => {
				initMap.setTarget(undefined);
			}
    }, []);

		function getClassBreaks(method: string, features: FeatureLike[], field: string, bin: number) {

      let minValue = Number.MAX_VALUE;
      let maxValue = Number.MIN_VALUE;
      let items: string[] = [];

      for (let i = 0, { length } = features; i < length; i += 1) {
        const value = features[i].get(field);
        if (isNaN(value)) {
          continue;
        }

        items[i] = Number(value).toFixed(7);
        minValue = Math.min(value, minValue);
        maxValue = Math.max(value, maxValue);
      }

      let breaks;
      if (items.length === 0) {
        return false;
      }
      const stat = new geostats(items);
      stat.setPrecision(6);

      if (method.indexOf('Eq') === 0) {
        breaks = stat.getClassEqInterval(bin);
      } else if (method.indexOf('Je') === 0 || method.indexOf('Na') === 0) {
        breaks = stat.getClassJenks(bin);
      } else if (method.indexOf('Qu') === 0) {
        breaks = stat.getClassQuantile(bin);
      } else if (method.indexOf('St') === 0) {
        breaks = stat.getClassStdDeviation(bin);
      } else if (method.indexOf('De') === 0) {
        breaks = [0, 1, 2.5, 5, 10, 100];
      } else { 
				return null;
			}

      breaks[0] = minValue - 0.1 < 0 ? 0 : minValue - 0.1;
      breaks[breaks.length - 1] = maxValue + 0.1;

      return breaks;
  	}

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
