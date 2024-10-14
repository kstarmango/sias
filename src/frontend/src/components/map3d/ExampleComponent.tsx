import {useCesium} from "resium";

const ExampleComponent = () => {
  const {viewer} = useCesium();
  console.log('ExampleComponent', viewer);

  return (
    <button onClick={() => {
      viewer?.screenshot.takeScreenshot();
    }}>Take Screenshot</button>
  );
};

export default ExampleComponent;