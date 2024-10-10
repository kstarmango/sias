import {CSSProperties, useRef} from "react";
import {MeasureDistance, useCesiumViewer} from ".";

export const MapView3D = ({
                            style = {float: "right", height: "100vh", width: "100%", backgroundColor: "gray"}
                          }: {
  style?: CSSProperties
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);

  // const cesium = useCesiumContext();

  // console.log(cesium);

  useCesiumViewer(mapContainer);

  return (
    <div id="globe" ref={mapContainer} style={style}>
      <MeasureDistance/>
    </div>
  );
}