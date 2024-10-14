import { atom } from "recoil";
import * as Cesium from "cesium";

export const PrintPotalOpenState = atom<boolean>({
  key: 'PrintPotalOpenState',
  default: false
});

export const MeasureDistanceOpenState = atom<boolean>({
  key: 'MeasureDistanceOpenState',
  default: true
});

export const MeasureAreaOpenState = atom<boolean>({
  key: 'MeasureAreaOpenState',
  default: false
});

export const MeasureAngleOpenState = atom<boolean>({
  key: 'MeasureAngleOpenState',
  default: false
});

export const MeasureComplexOpenState = atom<boolean>({
  key: 'MeasureComplexOpenState',
  default: false
});

export const SearchCoordinateOpenState = atom<boolean>({
  key: 'SearchCoordinateOpenState',
  default: false
});

export type ToolStatus = "angles" | "length" | "area" | "composite" | "search" | null;

export const ToolStatusState = atom<ToolStatus>({
  key: 'ToolStatusState',
  default: null
});

// 1. Recoil Atom 생성
export const viewerState = atom<Cesium.Viewer | null>({
  key: 'Cesium.Viewer.State', // 고유 키
  default: null,
});
