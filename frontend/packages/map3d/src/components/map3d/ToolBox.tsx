import {useCesiumViewer} from "@src/components/map3d";
import {useCallback} from "react";
import {Button} from "@adobe/react-spectrum";
import {useMapTools} from "@src/components/map3d/hooks/useMapTools.ts";
import {useSceneMode} from "@src/components/map3d/hooks/useSceneMode.ts";
import {useMapInteraction} from "@src/components/map3d/hooks/useMapInteraction.ts";
import * as Cesium from "cesium";

export type ToolBoxProps = {};

const ToolBox = () => {
  const tools = useMapTools();
  const {sceneMode, toggleSceneMode} = useSceneMode();
  const {mode, startMeasure} = useMapInteraction();
  const {viewer} = useCesiumViewer();

  const addLayer = useCallback(() => {
    viewer?.drawer.start({
      type: 'POLYGON',
      finalOptions: {
        material: Cesium.Color.RED.withAlpha(0.5),
      },
    });
    // viewer?.scene.primitives.remove()
    // console.log(viewer?.terrainProvider);
    // viewer?.vworld.setLayer(['Satellite', 'Hybrid']);
  }, [viewer]);

  const measure = useCallback(() => {
    viewer?.measure.start();
  }, [viewer]);

  return (
    <>
      <Button onPress={addLayer} variant="primary">Add Layer</Button>);
      <Button onPress={tools.captureScreenshot} variant="primary">화면 저장</Button>);
      <Button onPress={toggleSceneMode} variant="primary">Toggle Scene({sceneMode})</Button>);
      <Button onPress={measure} variant="primary">거리 측청{mode}</Button>);
      {/*<Button onPress={setFull} variant="primary">{full}</Button>);*/}
    </>
  );
};

export default ToolBox;