import * as Cesium from "cesium";
import {RefObject, useEffect} from "react";
import {useGlobeController} from "..";

export const useCesiumViewer = (containerRef: RefObject<HTMLDivElement>) => {
  const {globeController} = useGlobeController();

  useEffect(() => {
    const createViewer = async () => {
      if (!containerRef.current) return;

      // TerrainProvider 초기화
      const terrainProvider = await Cesium.CesiumTerrainProvider.fromUrl(import.meta.env.VITE_TERRAIN_SERVER_URL);

      const baseLayer = new Cesium.ImageryLayer(new Cesium.OpenStreetMapImageryProvider({
        url: 'https://tile.openstreetmap.org/'
      }), {show: true});

      // baseLayer: getWmsLayer(import.meta.env.VITE_BASE_LAYER_NAME),

      // Viewer 생성
      const viewer = globeController.createViewer(containerRef.current, {
        baseLayer,
        terrainProvider,
        geocoder: false,
        homeButton: false,
        baseLayerPicker: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        animation: false,
        timeline: false,
        fullscreenButton: false,
        shouldAnimate: true,
        infoBox: false,
        selectionIndicator: false,
      } as Cesium.Viewer.ConstructorOptions);

      // Globe 설정
      const scene = viewer.scene;
      const globe = scene.globe;
      globe.depthTestAgainstTerrain = true;

      // 카메라 초기 위치 설정
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          Number(import.meta.env.VITE_START_LONGITUDE),
          Number(import.meta.env.VITE_START_LATITUDE),
          Number(import.meta.env.VITE_START_HEIGHT)
        ),
        orientation: {
          heading: Cesium.Math.toRadians(0.0),
          pitch: Cesium.Math.toRadians(-60.0),
        },
        duration: 0,
      });

      // 더블 클릭 줌 비활성화
      viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

      // 카메라 이동 시 변화 감지 정도 설정
      viewer.scene.camera.percentageChanged = 0.01;

      return viewer;
    }

    if (!globeController.ready) {
      createViewer().then(viewer => {
        console.log('viewer', viewer);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, globeController]);
};
