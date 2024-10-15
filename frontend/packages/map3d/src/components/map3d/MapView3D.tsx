import * as Cesium from "cesium";
import {Cartesian3, Color} from "cesium";
import {CSSProperties, PropsWithChildren, useEffect, useRef} from "react";
import {CameraFlyTo, CesiumComponentRef, Entity, ImageryLayer, useCesium, Viewer} from "resium";
import {useSetRecoilState} from "recoil";
import {viewerState} from "@src/recoils/MapTool.ts";
import {screenshot} from "@src/components/map3d/mixin";

interface MapView3DProps {
  style?: CSSProperties;
}

export const MapView3D = ({
                            style = {float: "right", height: "100vh", width: "1000px", backgroundColor: "gray"},
                            children
                          }: PropsWithChildren<MapView3DProps>) => {
  const viewerRef = useRef<CesiumComponentRef<Cesium.Viewer>>(null);
  const setViewer = useSetRecoilState(viewerState);
  // const {  } = useCesium();

  useEffect(() => {
    if (viewerRef.current?.cesiumElement) {
      // alert('test');
      // setViewer(viewerRef.current.cesiumElement);
    }
  }, []);

  const cesium = useCesium();

  const destination = Cartesian3.fromDegrees(
    Number(import.meta.env.VITE_START_LONGITUDE),
    Number(import.meta.env.VITE_START_LATITUDE),
    Number(import.meta.env.VITE_START_HEIGHT)
  );

  return (
    <Viewer
      ref={viewerRef}
      full={true}
      geocoder={true}
      homeButton={true}
      baseLayerPicker={false}
      sceneModePicker={false}
      navigationHelpButton={false}
      animation={false}
      timeline={false}
      fullscreenButton={false}
      shouldAnimate={true}
      infoBox={false}
      selectionIndicator={false}
      extend={screenshot}
    >
      <ImageryLayer
        imageryProvider={new Cesium.OpenStreetMapImageryProvider({url: 'https://tile.openstreetmap.org/'})}/>
      {/*<Scene />*/}
      {/*<Camera defaultZoomAmount={100} defaultLookAmount={10} defaultRotateAmount={10}/>*/}
      {/*<CameraFlyHome duration={1000}/>*/}
      <CameraFlyTo
        destination={destination}
        orientation={{
          heading: Cesium.Math.toRadians(0.0),
          pitch: Cesium.Math.toRadians(-60.0),
        }}
        duration={0}
      />
      <Entity
        name="Tokyo"
        position={Cartesian3.fromDegrees(139.767052, 35.681167, 100)}
        point={{ pixelSize: 10, color: Color.WHITE }}
        description="hoge"
      />
      {children}
    </Viewer>
  );
}