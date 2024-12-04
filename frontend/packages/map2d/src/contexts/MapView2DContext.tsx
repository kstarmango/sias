import "ol/ol.css";
import 'ol-ext/dist/ol-ext.css';
import Map from "ol/map";
import proj4 from 'proj4'
import View from "ol/view";
import TileLayer from "ol/layer/tile";
import OSM from "ol/source/osm";
import Interaction from "ol/interaction/Interaction";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import {MapOptions} from "ol/Map";
import {register} from 'ol/proj/proj4'
import {createContext, useEffect, useState} from "react";
import {Stroke, Fill, Style} from "ol/style";

import {useAuth} from "@shared/auth";

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
	setInteractions: (interactions: Interaction[]) => void,
	getTitleLayer: (title: string) => VectorLayer | null,
	// addDrawInteractionByType: (type: string, radius?: number) => void
}>({
	map: null,
	interactions: [],
	setMap: () => {},
	setInteractions: () => {},
	getTitleLayer: () => null,
	// addDrawInteractionByType: () => {}
});

export const MapView2DProvider = ({children}: {children: React.ReactNode}) => {

  const {authenticated} = useAuth();
  const [map, setMap] = useState<Map | null>(null);
  const [interactions, setInteractions] = useState<Interaction[]>([]);

	useEffect(() => {

		const analysisInputLayer = new VectorLayer({
			source: new VectorSource(),
			style: new Style({
				stroke: new Stroke({ color: 'red', width: 2 })
			})
		});
		analysisInputLayer.set('title', 'analysisInput');

		const festivalInflowLayer = new VectorLayer({
			source: new VectorSource(),
		});
		festivalInflowLayer.set('title', 'festival_inflow');

		const festivalRevenueLayer = new VectorLayer({
			source: new VectorSource(),
		});
		festivalRevenueLayer.set('title', 'festival_revenue');

		const lifeVulnAreaLayer = new VectorLayer({
			source: new VectorSource(),
		});
		lifeVulnAreaLayer.set('title', 'life_vuln_area');

		const lifeServiceFacilityLayer = new VectorLayer({
			source: new VectorSource(),
		});
		lifeServiceFacilityLayer.set('title', 'life_service_facility');

		const initMap = new Map({
			target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
				analysisInputLayer,
				festivalInflowLayer,
				festivalRevenueLayer,
				lifeVulnAreaLayer,
				lifeServiceFacilityLayer
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

	const getTitleLayer = (title: string) => map?.getLayers().getArray().filter(layer => layer?.get('title') === title)[0] as VectorLayer;

	// function addDrawInteractionByType(type, radius?: number) {
	
	// 	let vector = getTitleLayer('analysisInput');
	// 	let source = vector.getSource();
	// 	source?.clear();
	// 	if(!map) return;
	// 	if(!source) return;
	
	// 	const translateContext = new Translate({
	// 		layers: [vector],
	// 	});

	// 	translateContext.set('title', 'Translate');
	// 	map?.addInteraction(translateContext);
		
	// 	const modifyContext = new Modify({ source: source as VectorSource<Feature<Geometry>> });
	// 	modifyContext.set('title', 'Modify');
	// 	map?.addInteraction(modifyContext);
		
	// 	const geometryFunction = type === 'Box' ? createBox() : undefined;
		
	// 	let drawContext: Draw;

	// 	if (type === 'Circle') {
	// 		drawContext = new Draw({
	// 			source,
	// 			type: 'Point',
	// 		});
	// 		drawContext.set('title', 'Draw');
	
	// 		drawContext.on('drawstart', e => {
	// 			if (!radius || radius <= 0) {
	// 				alert('반지름을 0보다 크게 설정해주세요.');
	// 				source.clear();
	// 				map.removeInteraction(drawContext);
	// 			}
	// 		})
	
	// 		drawContext.on('drawend', e => makeCircle(e, radius))
	// 		map.addInteraction(drawContext);
	
	// 	} else if (type !== 'Circle') {

	// 		drawContext = new Draw({
	// 			source,
	// 			type: type === 'Box' ? 'Circle' : type,
	// 			geometryFunction,
	// 		});
	// 		drawContext.set('title', 'Draw');

	// 		drawContext.on('drawstart', function () {
	// 			getTitleLayer('analysisInput')?.getSource()?.clear();
	// 			setInteractions([...interactions, drawContext]);
	// 		});
		
	// 		drawContext.on('drawend', function () {
	// 			debugger;
	// 			map.removeInteraction(drawContext);
	// 			setInteractions(interactions.filter(interaction => interaction !== drawContext));
	// 		});
			
	// 		setInteractions([...interactions, drawContext]);
	// 		map.addInteraction(drawContext);
	// 	}
	// }

	// function makeCircle(e, radius?: number) {
	// 	const source = getTitleLayer('analysisInput')?.getSource();
	// 	if(!source) return;
		
	// 	let point;

	// 	if(e){
	// 		point = e.feature.getGeometry().getCoordinates();
	// 	} else {
	// 		point =  source?.getFeatures().filter(f => f.getGeometry().getType() == 'Point')[0].getGeometry().getCoordinates();
	// 		const circle =  source.getFeatures().filter(f => f.getGeometry().getType() == 'Circle')[0];
	// 		source.removeFeature(circle);
	// 	}

	// 	const circleFeature = new Feature({
	// 		geometry: new Circle(point, radius),
	// 	});
	
	// 	source.addFeatures([circleFeature]);
	// 	interactions.forEach(interaction => map?.removeInteraction(interaction));
	// }

  return (
		<MapContext.Provider 
			value={{
				map,
				interactions,
				setMap, 
				setInteractions,
				getTitleLayer,
				// addDrawInteractionByType
			}}
		>	
			{children}
		</MapContext.Provider>
  );
}

