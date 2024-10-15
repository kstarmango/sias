import {createContext} from "react";
import * as Cesium from "cesium";

interface CesiumContextProps<T = unknown> {
  signIn: (args?: unknown) => Promise<void>;
  signOut: (args?: unknown) => Promise<void>;
  viewer: Cesium.Viewer | null;
  userData?: T | null;
  isExpired?: boolean;
  status: 'loading' | 'idle';
}

// export const CesiumContext = createContext<CesiumContextProps<T> | undefined>(undefined);

export const createCesiumContext = <T = unknown>() => {
  return createContext<CesiumContextProps<T> | undefined>(undefined);
}

export const useCesiumContext = () => {
  const context = createCesiumContext();

  if (!context) {
    throw new Error("useCesiumContext must be used within a CesiumContext");
  }

  return context;
};