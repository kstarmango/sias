import {Viewer} from "cesium";
import AreaMeasure from "@src/components/map3d/mixin/measure/AreaMeasure.ts";

declare module "cesium" {
  interface Viewer {
    measure: AreaMeasure;
  }
}

export default function (viewer: Viewer) {
  Object.defineProperties(Viewer.prototype, Object.freeze({
    measure: {
      value: new AreaMeasure(viewer),
      writable: true
    },
  }));
}