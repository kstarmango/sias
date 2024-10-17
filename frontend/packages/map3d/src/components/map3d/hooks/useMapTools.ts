import {useCallback} from "react";
import {useCesiumViewer} from "@src/components/map3d";
import {SceneMode} from "cesium";
import * as BlobUtil from "@shared/utils/BlobUtil.ts";

export const useMapTools = () => {
  const {viewer} = useCesiumViewer();

  const toggleSceneMode = useCallback(() => {
    if (viewer) {
      viewer.scene.mode = SceneMode.SCENE2D;
    }
  }, [viewer]);

  const captureScreenshot = useCallback(() => {
    viewer?.captureScreenshot('image/png').then((blob) => {
      BlobUtil.download(blob, "screenshot.png").then(console.log);
    });
  }, [viewer]);

  // const sceneMode = useCallback((mode: SceneMode) => {
  //   if (viewer) {
  //     viewer.scene.mode = mode;
  //   }
  // }, [viewer]);

  return {
    toggleSceneMode,
    captureScreenshot,
  };
};