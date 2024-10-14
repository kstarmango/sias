import {Viewer} from "cesium";

export interface MeasureConfig {
  unit: string;
  measureType: string;
}

export interface MeasureResult {
  id: string;
  type: string;
  unit: string;
  value: number;
}

declare module "cesium" {
  interface Viewer {
    screenshot: Screenshot;
  }
}

class Screenshot {
  viewer: Viewer;

  constructor(viewer: Viewer) {
    this.viewer = viewer;
  }

  private captureScreenshot(fileType: string = 'image/png'): string {
    const canvas = this.viewer.scene.canvas;
    return canvas.toDataURL(fileType);
  }

  private saveScreenshot(dataUrl: string, fileName: string = 'screenshot.png') {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName;
    link.click();
  }

  takeScreenshot(fileName: string = 'screenshot.png', fileType: string = 'image/png') {
    const dataUrl = this.captureScreenshot(fileType);
    this.saveScreenshot(dataUrl, fileName);
  }
}

interface ScreenshotOptions {
  showToggle: boolean
}

export default function (viewer: Viewer, options: ScreenshotOptions = {showToggle: false}) {
  Object.defineProperties(Viewer.prototype, {
    screenshot: {
      value: new Screenshot(viewer),
      writable: true
    },
  });
}
