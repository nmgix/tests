import Container from "components/Container";
import Canvas from "components/Widgets/Calculator/Canvas";
import React from "react";
import { Provider } from "react-redux";
import store from "redux/store";
import { CanvasComponentsKeyArray } from "types/Canvas";

const sidebarComponents: CanvasComponentsKeyArray = [
  "display",
  "operationButtons",
  "digitalBlock",
  "equalizationButton",
];

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className='bg-neutral-200 h-screen w-screen flex justify-center items-center'>
        <Container externalClassnames='bg-white w-[695px]'>
          <Container>
            {/* <Display canvasId='0' />
            <OperationButtons canvasId='0' />
            <DigitalBlock canvasId='0' />
            <EqualizationButton canvasId='0' /> */}
            <Canvas noRuntime existingComponents={sidebarComponents} />
          </Container>
          <Container>
            <Canvas />
          </Container>
        </Container>
      </div>
    </Provider>
  );
};
