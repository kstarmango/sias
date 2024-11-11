import {useContext} from "react";
import {CesiumViewerContext} from "@src/components/map3d/context/CesiumViewerContext.tsx";

export const useCesiumViewer = () => {
  const context = useContext(CesiumViewerContext);
  if (!context) {
    throw new Error('useCesiumViewer must be used within a CesiumViewerProvider');
  }
  return context;
};