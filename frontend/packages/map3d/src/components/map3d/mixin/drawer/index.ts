import {Viewer} from "cesium";
import Drawer from "@carped99/cesium-drawer";

declare module "cesium" {
  interface Viewer {
    drawer: Drawer;
  }
}

export default function (viewer: Viewer) {
  Object.defineProperties(Viewer.prototype, Object.freeze({
    drawer: {
      value: new Drawer(viewer, {
        sameStyle: false,
      }),
      writable: true
    },
  }));
}