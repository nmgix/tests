import Container from "components/Container";
import Canvas from "components/Widgets/Calculator/Canvas";
import React from "react";
import { Provider } from "react-redux";
import store from "redux/store";
import { CanvasExistingComponent } from "types/Canvas";

const sidebarComponents: CanvasExistingComponent[] = [
  {
    component: "display",
    indestructible: true,
  },
  {
    component: "operationButtons",
    indestructible: true,
  },
  {
    component: "digitalBlock",
    indestructible: true,
  },
  {
    component: "equalizationButton",
    indestructible: true,
  },
];

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className='bg-neutral-200 h-screen w-screen flex justify-center items-center'>
        <Container externalClassnames='bg-white w-[695px] flex justify-between'>
          <Container>
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
