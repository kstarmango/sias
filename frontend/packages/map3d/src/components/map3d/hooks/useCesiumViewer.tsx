import * as Cesium from "cesium";
import {createContext, PropsWithChildren, useContext, useMemo, useState} from "react";

interface CesiumViewerContextProps {
  viewer?: Cesium.Viewer;
  setViewer: (viewer: Cesium.Viewer) => void;
}

const CesiumViewerContext = createContext<CesiumViewerContextProps | undefined>(undefined);

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

export const useCesiumViewer = () => {
  const context = useContext(CesiumViewerContext);
  if (!context) {
    throw new Error('useCesiumViewer must be used within a CesiumViewerProvider');
  }
  return context;
};