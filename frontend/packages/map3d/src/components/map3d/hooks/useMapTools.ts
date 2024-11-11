import {useCallback} from "react";
import {useCesiumViewer} from "@src/components/map3d";
import {SceneMode} from "cesium";

export const useMapTools = () => {
  const {viewer} = useCesiumViewer();

  const toggleSceneMode = useCallback(() => {
    if (viewer) {
      viewer.scene.mode = SceneMode.SCENE2D;
    }
  }, [viewer]);

  // const sceneMode = useCallback((mode: SceneMode) => {
  //   if (viewer) {
  //     viewer.scene.mode = mode;
  //   }
  // }, [viewer]);

  return {
    toggleSceneMode,
  };
};