import Drawer from "@src/components/map3d/mixin/drawer/drawer.ts";
import {Viewer} from "cesium";

declare module "cesium" {
  interface Viewer {
    drawer: Drawer;
  }
}

export default function (viewer: Viewer) {
  Object.defineProperties(Viewer.prototype, Object.freeze({
    drawer: {
      value: new Drawer(viewer),
      writable: true
    },
  }));
}