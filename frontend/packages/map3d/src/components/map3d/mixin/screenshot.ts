import {JulianDate, Viewer} from "cesium";


declare module "cesium" {
  interface Viewer {
    captureScreenshot: (imageFormat?: ImageFormat) => Promise<Blob>;
  }
}

type ImageFormat = 'image/png' | 'image/jpeg' | 'image/webp';

const captureScreenshot = async (viewer: Viewer, imageFormat: ImageFormat = 'image/png'): Promise<Blob> => {
  const {scene} = viewer;
  return new Promise<Blob>((resolve, reject) => {
    const removeCallback = scene.postRender.addEventListener(() => {
      removeCallback();
      const canvas = scene.canvas;
      canvas.toBlob(blob => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to take screenshot. blob is null'));
        }
      }, imageFormat);
    });
    scene.render(JulianDate.now());
  });
}

export default function (viewer: Viewer) {
  Object.defineProperties(Viewer.prototype, Object.freeze({
    captureScreenshot: {
      value: (imageFormat?: ImageFormat) => captureScreenshot(viewer, imageFormat),
      writable: true
    },
  }));
}
