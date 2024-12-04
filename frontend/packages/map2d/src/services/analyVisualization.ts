import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import FlowLine from "ol-ext/style/FlowLine";
import Feature, { FeatureLike } from "ol/Feature";
import axios from "axios";
import VectorLayer from "ol/layer/Vector";
import { Geometry } from "ol/geom";
import Map from "ol/Map";

import { FestivalInfluxAnalysisCondition, FestivalRevenueAnalysisCondition } from "@src/types/analysis-condition";
import {Style, Fill, Stroke, Text} from "ol/style";

/** 축제 유입 분석 시각화 - layerTitle: festival_inflow */
export const odFlowMap = async (data: FestivalInfluxAnalysisCondition, map: Map) => {
  try {

    const fetchFestivalInflowData = async () => {
      const geoserverUrl = '/geoserver/jn/ows';
      const { x_coord, y_coord, startDate, endDate, radius, des_cd } = data;
      
      const params = new URLSearchParams({
        service: 'WFS',
        version: '1.1.0',
        request: 'GetFeature',
        typeName: 'jn:jn_festival_inflow_age', 
        outputFormat: 'application/json',
        srs: 'EPSG:5186',
        viewparams: `x_coord:${x_coord};y_coord:${y_coord};start_date:${startDate};end_date:${endDate};radius:${radius};des_cd:${des_cd}`
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
      
      return (feature: FeatureLike) => {

        // const feature_ = feature.clone() as Feature<Geometry>;

        // const featureGeometry = feature_.getGeometry()?.transform('EPSG:5186', 'EPSG:4326') as LineString;
        // const coordinates = featureGeometry?.getCoordinates();
        // const centerPoint = midpoint(coordinates[0], coordinates[coordinates.length - 1]);
        // const updatedCoordinates = [...coordinates, centerPoint.geometry.coordinates]
        // featureGeometry.setCoordinates(updatedCoordinates);
        // feature_.setGeometry(featureGeometry);

        // const opt = {
        // 	tension: 0.7, 
        // 	pointsPerSeg: 10,
        // 	normalize: false
        // };

        // const geometry = feature.getGeometry() as Geometry & { cspline?: (options: any) => any }
        // const csp = geometry.cspline ? geometry.cspline(opt) : null

        // const cspStyle = new Style({
        // 	geometry: csp
        // });

        const colorList = ['#800026cc', '#bd0026cc', '#e31a1ccc', '#fc4e2acc', '#fd8d3ccc', '#feb24ccc', '#fed976cc', '#ffeda0cc', '#ffffcccc', '#fffffcc'];
        const featureIndex = topTenFeaturesIdList.indexOf(feature.getId());

        const labelStyle = new Style({
          text: new Text({
            font: '15px Calibri,sans-serif',
            fill: new Fill({
              color: '#000',
            }),
            stroke: new Stroke({
              color: '#fff',
              width: 4,
            }),
            text: feature.getProperties().sid_nm + ' \n 총 : ' + feature.getProperties().pop_all.toFixed() + '명'
          }),
          zIndex: 2
        });

        const flowLine = new FlowLine({
          color: colorList[featureIndex],
          color2: colorList[featureIndex],
          width: widthList[0][featureIndex],
          width2: widthList[1][featureIndex],
          arrow: 1,
        });

        // return [flowLine, cspStyle];
        return [labelStyle, flowLine];
      }
    }

    fetchFestivalInflowData().then(data => {
      let featureData = data;

      if(!featureData.features) {
        alert('분석 조건에 충족하는 분 결과가 존재하지 않습니다.');
        return;
      }

      const topTenFeatures = featureData.features
        .sort((a, b) => b.properties.pop_all - a.properties.pop_all)
        .slice(0, 10);

      featureData.features = topTenFeatures;

      const featureReader = new GeoJSON();
      const features = featureReader.readFeatures(featureData) as Feature<Geometry>[];

      const duplicate : VectorLayer<VectorSource<Feature<Geometry>>>[] = map?.getLayers().getArray().filter(lyr => lyr instanceof VectorLayer && lyr.get('title') === 'festival_inflow');
      let vectorLayer : VectorLayer<VectorSource<Feature<Geometry>>>;
      const source = new VectorSource({
        features: features
      });

      if(duplicate.length > 0){
        vectorLayer = duplicate[0];
        vectorLayer.setSource(source);
        vectorLayer.setStyle(styleFunction(topTenFeatures));
      }else{
        vectorLayer = new VectorLayer({
          source,
          style: styleFunction(topTenFeatures)
        });
        vectorLayer.set('title', 'festival_inflow');
        map?.addLayer(vectorLayer as unknown as VectorLayer<VectorSource<Feature<Geometry>>>);
      }

    }).catch(error => {
      console.error(error);
    });

  } catch (error) {
    console.error(error);
  }
}

/** 축제 매출 분석 시각화 - layerTitle: festival_sales_all */
export const fesitvalSalesAll = async (data: FestivalRevenueAnalysisCondition, map: Map) => {

  try {
    const fetchFestivalSalesAllData = async () => {
      const geoserverUrl = '/geoserver/jn/ows';
      const { x_coord, y_coord, startDate, endDate, radius, order } = data;
      
      const params = new URLSearchParams({
        service: 'WFS',
        version: '1.1.0',
        request: 'GetFeature',
        typeName: 'jn:jn_festival_sales_age_all', 
        outputFormat: 'application/json',
        srs: 'EPSG:5186',
        viewparams: `x_coord:${x_coord};y_coord:${y_coord};start_date:${startDate};end_date:${endDate};radius:${radius};order:${order}`
      })
  
      const response = await axios.get(`${geoserverUrl}?${params.toString()}`);
      if(!response.data){
        throw new Error('네트워크 응답이 좋지 않습니다.')
      }
      return response.data;
    }

    const styleFunction = (features: Feature<Geometry>[]) => {
      return (feature: FeatureLike) => {

        debugger;

        return new Style({
          fill: new Fill({ color: 'red' })
        });
      }
    }

    fetchFestivalSalesAllData().then(data => {
      if(!data.features) {
        alert('분석 조건에 충족하는 분석 결과가 존재하지 않습니다.');
        return;
      }

      debugger;

      const featureReader = new GeoJSON();
      const features = featureReader.readFeatures(data) as Feature<Geometry>[];

      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: features
        }),
        style: styleFunction(features)  
      });

      vectorLayer.set('title', 'festival_sales_all');
      map?.addLayer(vectorLayer);

    }).catch(error => {
      console.error(error);
    })
  } catch (error) {
    console.error(error);
  }
}

