import {CSSProperties, PropsWithChildren, useEffect} from "react";
import {useCesiumViewer} from "@src/components/map3d";
import {useCesium, Viewer} from "resium";
import {vworld} from "@src/components/map3d/mixin";

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
      extend={[vworld]}>
      {children}
      <CesiumViewerSetter/>
    </Viewer>
  );
}

