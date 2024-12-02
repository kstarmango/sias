import VectorSource from "ol/source/Vector";
import VectorImage from "ol/layer/VectorImage";
import GeoJSON from "ol/format/GeoJSON";
import FlowLine from "ol-ext/style/FlowLine";
import Feature from "ol/Feature";
import { useContext } from "react";

import { MapContext } from "@src/contexts/MapView2DContext";
import { StyleFunction } from "ol/style/Style";

export const odFlowMap = async (data: any) => {
  try {
    const { map } = useContext(MapContext);
  
    if (map === null) {
      console.error("map is not initialized");
      return;
    }

    if(map.getLayers().getArray().filter((layer) => layer.get('id') === 'flow').length > 0) {
      map.removeLayer(map.getLayers().getArray().filter((layer) => layer.get('id') === 'flow')[0]);
    }

    const geoJsonFormat = new GeoJSON();
    const features = geoJsonFormat.readFeatures(data, {
      featureProjection: 'EPSG:5186'
    });

    let COLOR_LIST = [
      "rgba(255, 255, 255, 1)",
      "rgba(255, 255, 204, 1)",
      "rgba(255, 237, 160, 1)",
      "rgba(254, 217, 118, 1)",
      "rgba(254, 180, 76, 1)",
      "rgba(253, 141, 60, 1)",
      "rgba(252, 78, 42, 1)",
      "rgba(227, 26, 28, 1)",
      "rgba(189, 0, 38, 1)",
      "rgba(128, 0, 38, 1)",
    ]

    function getStyle(feature: Feature) {

      let dataList = feature.get('pop_10g');
      dataList = dataList.sort((a, b) => a - b);

      if(data.totalFeatures > COLOR_LIST.length) {
        COLOR_LIST.unshift('rgba(255, 255, 255, 1)');
      }

      function getWidth(dataList: number[], item: number) {
        const min = Math.min(...dataList);
        const max = Math.max(...dataList);
        const range = max - min;
        const width = 50 - (50 - 5) * (item - min) / range;
        return width;
      }

      const flowItem = dataList.map((item, idx) => {
        return {
          color: COLOR_LIST[idx],
          color2: COLOR_LIST[idx],
          width: getWidth(dataList, item) / 2,
          width2: getWidth(dataList, item),
        }
      })

      const flowStyle = new FlowLine(flowItem);
      
      return flowStyle;
    }

    const vector = new VectorImage({
      source: new VectorSource({ features }),
      style: getStyle as StyleFunction
    })
    vector.set('title', 'analysis');
    vector.set('id', 'flow'); // provide custom id if needed

    if (vector.getSource() !== null) {
      map.addLayer(vector);
    }
    
  } catch (error) {
    console.error(error);
  }
}

