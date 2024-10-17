import {CSSProperties, PropsWithChildren, useEffect} from "react";
import {useCesiumViewer} from "@src/components/map3d";
import {useCesium, Viewer} from "resium";
import {measure, screenshot, vworld} from "@src/components/map3d/mixin";
import drawer from "@src/components/map3d/mixin/drawer";

interface MapView3DProps {
  style?: CSSProperties;
}

const CesiumViewerSetter = () => {
  const context = useCesium();
  const {setViewer} = useCesiumViewer();

  useEffect(() => {
    if (context.viewer) {
      setViewer(context.viewer);
    }
  }, [context, setViewer]);

  return null;
}

export const CesiumViewer = ({
                               children
                             }: PropsWithChildren<MapView3DProps>) => {
  return (
    <Viewer
      extend={[screenshot, measure, vworld, drawer]}>
      {children}
      <CesiumViewerSetter/>
    </Viewer>
  );
}

