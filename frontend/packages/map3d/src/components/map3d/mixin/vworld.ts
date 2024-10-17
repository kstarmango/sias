import * as Cesium from "cesium";

declare module "cesium" {
  interface Viewer {
    vworld: VWorld;
  }
}

export type VWorldLayer = 'Satellite' | 'Hybrid' | 'Base' | 'white' | 'midnight';

class VWorld {
  viewer: Cesium.Viewer;

  constructor(viewer: Cesium.Viewer) {
    this.viewer = viewer;
  }

  private getTileFormat(layer: VWorldLayer) {
    return layer === 'Satellite' ? 'image/jpeg' : 'image/png';
  }

  private getTileExtension(layer: VWorldLayer) {
    return layer === 'Satellite' ? 'jpeg' : 'png';
  }

  private createProvider(layer: VWorldLayer) {
    const tileExtension = this.getTileExtension(layer);
    const tileFormat = this.getTileFormat(layer);

    return new Cesium.WebMapTileServiceImageryProvider({
      url: `https://api.vworld.kr/req/wmts/1.0.0/3CD12680-B140-3B9C-B61E-132294AE6A31/${layer}/{TileMatrix}/{TileRow}/{TileCol}.${tileExtension}`,
      layer: layer,
      style: 'default',
      rectangle: Cesium.Rectangle.fromDegrees(124.0, 33.0, 132.0, 43.0),
      tileMatrixSetID: 'EPSG:3857',
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
      maximumLevel: 19,
      format: tileFormat,
      credit: new Cesium.Credit('VWorld Korea'),
    });
  }

  private addLayer(layer: VWorldLayer) {
    const {imageryLayers} = this.viewer;
    const provider = this.createProvider(layer);
    imageryLayers.add(new Cesium.ImageryLayer(provider, {
      minimumTerrainLevel: 6,
    }));
  }

  private removeAll() {
    const {imageryLayers} = this.viewer;
    for (let i = imageryLayers.length - 1; i >= 0; i--) {
      const layer = imageryLayers.get(i);
      const credit = layer.imageryProvider.credit?.html;
      if (credit && credit.includes('VWorld Korea')) {
        layer.show = false;
        // imageryLayers.remove(layer);
      }
    }
  }

  /**
   * 브이월드 이미지 레이어를 추가한다.
   * @param layerName
   */
  setLayer(layerName: VWorldLayer | VWorldLayer[]) {
    this.removeAll();

    if (Array.isArray(layerName)) {
      layerName.forEach(l => this.addLayer(l));
    } else {
      // this.addLayer(layerName);
    }
  }
}

export default function (viewer: Cesium.Viewer) {
  Object.defineProperties(Cesium.Viewer.prototype, {
    vworld: {
      value: new VWorld(viewer),
      writable: true
    },
  });
}
