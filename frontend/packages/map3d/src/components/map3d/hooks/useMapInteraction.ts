import {useCesiumViewer} from "@src/components/map3d";
import {useCallback, useEffect, useRef, useState} from "react";
import * as Cesium from "cesium";

type MeasureMode = 'distance' | 'area';

export const useMapInteraction = () => {
  const {viewer} = useCesiumViewer();
  const [mode, setMode] = useState<MeasureMode>();

  const measureDataSources = new Cesium.CustomDataSource('measure');

  const handlerRef = useRef<Cesium.ScreenSpaceEventHandler | null>(null);

  const pickPosition = useCallback((pos: Cesium.Cartesian2): Cesium.Cartesian3 | undefined => {
    return viewer?.scene.pickPosition(pos) ?? viewer?.scene.camera.pickEllipsoid(pos, viewer?.scene.globe.ellipsoid);
  }, [viewer]);

  useEffect(() => {
    if (!viewer) return;

    if (mode === 'distance') {
      console.log('useMapInteraction mode:', mode);

      const positions: Cesium.Cartesian3[] = [];
      const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

      handler.setInputAction((movement: Cesium.ScreenSpaceEventHandler.MotionEvent) => {
        const position = pickPosition(movement.endPosition);
        console.log('mousemove', movement.endPosition, position);
        if (!position || positions.length === 0) return;

        if (positions.length === 1) {
          positions.push(position);
        }

        positions.pop();
        positions.push(position);

        console.log(positions);

        // guideEntity.position = new Cesium.ConstantPositionProperty(cartesian);
        // if(guideEntity.label) guideEntity.label.text = new Cesium.ConstantProperty(getText(cartesians));
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      // 측정 지점 추가
      handler.setInputAction((clicked: Cesium.ScreenSpaceEventHandler.PositionedEvent) => {
        const position = pickPosition(clicked.position);
        if (!position) return;

        positions.push(position);

        console.log('click', clicked.position, position);

        if (positions.length === 1) {
          const distanceEntity = measureDataSources.entities.getOrCreateEntity("length");
          distanceEntity.polyline = new Cesium.PolylineGraphics({
            positions: new Cesium.CallbackProperty(() => positions, false),
            width: new Cesium.ConstantProperty(2),
            material: new Cesium.ColorMaterialProperty((Cesium.Color.fromCssColorString('#FF015F'))),
            clampToGround: new Cesium.ConstantProperty(true),
          });
        }

        addClickPoint(position);
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      // 마우스 우클릭 - 측정 종료
      handler.setInputAction((clicked: Cesium.ScreenSpaceEventHandler.PositionedEvent) => {
        const cartesian = pickPosition(clicked.position);
        if (!cartesian) return;
        // addClickPoint(cartesian);
        // postProcess();
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

      handlerRef.current = handler;

      viewer?.dataSources.add(measureDataSources);
    }

    // cleanup
    return () => {
      console.log('cleanup');
      viewer?.dataSources.remove(measureDataSources);
      handlerRef.current?.destroy();
      handlerRef.current = null;
    }
  }, [viewer, mode]);

  const addClickPoint = useCallback((cartesian: Cesium.Cartesian3) => {
    measureDataSources.entities.add({
      position: cartesian,
      point: {
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        pixelSize: 10,
        color: Cesium.Color.WHITE,
        outlineColor: Cesium.Color.fromCssColorString('#FF015F'),
        outlineWidth: 2,
      },
      label: {
        text: "getText(cartesians)",
        showBackground: true,
        font: '16px sans-serif YELLOW',
        backgroundColor: Cesium.Color.fromCssColorString('#fff').withAlpha(1),
        horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        style: Cesium.LabelStyle.FILL,
        fillColor: Cesium.Color.fromCssColorString('#FF015F'),
      }
    });
  }, [measureDataSources]);

  const clearMeasure = useCallback(() => {
    measureDataSources.entities.removeAll();
  }, [viewer]);

  const startMeasure = useCallback((mode: MeasureMode) => {
    setMode(mode);
  }, [viewer]);

  // const [bounds, setBounds] = useState<DOMRectReadOnly | null>(null);
  // const ref = useCallback((node: HTMLElement | null) => {
  //   if (node !== null) {
  //     setBounds(node.getBoundingClientRect());
  //   }
  // }, []);
  // return { ref, bounds };

  return {
    mode,
    startMeasure,
    clearMeasure,
  }
}