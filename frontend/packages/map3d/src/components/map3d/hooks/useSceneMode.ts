import {useCesiumViewer} from "@src/components/map3d";
import {useCallback, useEffect, useState} from "react";
import * as Cesium from "cesium";

export const useSceneMode = () => {
  const {viewer} = useCesiumViewer();
  const [sceneMode, setSceneMode] = useState<Cesium.SceneMode>();

  useEffect(() => {
    if (!viewer) return;

    setSceneMode(viewer.scene.mode);

    const removeCallback = viewer.scene.morphComplete.addEventListener(() => {
      setSceneMode(viewer.scene.mode);
    });

    return () => {
      removeCallback();
    };
  }, [viewer, setSceneMode]);

  const updateSceneMode = useCallback((mode: Cesium.SceneMode) => {
    if (!viewer) return;
    viewer.scene.mode = mode;
  }, [viewer]);

  const toggleSceneMode = useCallback(() => {
    if (!viewer) return;
    viewer.scene.mode = viewer.scene.mode === Cesium.SceneMode.SCENE3D ? Cesium.SceneMode.SCENE2D : Cesium.SceneMode.SCENE3D;
  }, [viewer]);

  return {
    sceneMode,
    setSceneMode: updateSceneMode,
    toggleSceneMode
  };
}