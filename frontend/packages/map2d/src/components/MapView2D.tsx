import {useEffect} from "react";
import "ol/ol.css";
import Map from "ol/map";
import View from "ol/view";
import TileLayer from "ol/layer/tile";
import OSM from "ol/source/osm";
import {MapOptions} from "ol/Map";
import {useAuth} from "@shared/auth";

export interface MapView2DProps extends MapOptions {

}

export const MapView2D = ({
                            target = "map",
                            ...props
                          }: MapView2DProps) => {
  const {authenticated} = useAuth();

  console.log(authenticated);

  useEffect(() => {
    const map = new Map({
      target,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
      ...props,
    });

    return () => {
      map.setTarget(undefined);
    };
  }, []);
  return <div id="map" style={{width: "100%", height: "100%"}}/>;
}
