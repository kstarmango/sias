import Cesium from "cesium";
import {createContext, PropsWithChildren, useMemo, useState} from "react";

interface CesiumViewerContextProps {
  viewer?: Cesium.Viewer;
  setViewer: (viewer: Cesium.Viewer) => void;
}

export const CesiumViewerContext = createContext<CesiumViewerContextProps | undefined>(undefined);

export const CesiumViewerProvider = ({children}: PropsWithChildren) => {
  const [viewer, setViewer] = useState<Cesium.Viewer>();

  const contextValue = useMemo(() => ({
    viewer,
    setViewer,
  }), [viewer, setViewer]);

  return (
    <CesiumViewerContext.Provider value={contextValue}>{children}</CesiumViewerContext.Provider>
  );
};