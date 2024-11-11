import {Button} from "@adobe/react-spectrum";
import {useSceneMode} from "@src/components/map3d/hooks/useSceneMode.ts";

export type ToolBoxProps = {};

const ToolBox = () => {
  const {sceneMode, toggleSceneMode} = useSceneMode();

  return (
    <>
      <Button onPress={toggleSceneMode} variant="primary">Toggle Scene({sceneMode})</Button>);
      {/*<Button onPress={setFull} variant="primary">{full}</Button>);*/}
    </>
  );
};

export default ToolBox;