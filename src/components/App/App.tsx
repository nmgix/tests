import Container from "components/Container";
import Canvas from "components/Widgets/Calculator/Canvas";
import React from "react";
import { Provider } from "react-redux";
import store from "redux/store";
import { CanvasExistingComponent } from "types/Canvas/Canvas.components";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { DndProvider } from "react-dnd-multi-backend";

const sidebarComponents: CanvasExistingComponent[] = [
  {
    component: "display",
    indestructible: true,
    draggable: true,
  },
  {
    component: "operationButtons",
    indestructible: true,
    draggable: true,
  },
  {
    component: "digitalBlock",
    indestructible: true,
    draggable: true,
  },
  {
    component: "equalizationButton",
    indestructible: true,
    draggable: true,
  },
  {
    component: "storage",
    indestructible: true,
    draggable: true,
  },
];

const canvasComponents: CanvasExistingComponent[] = [
  {
    component: "storage",
    indestructible: true,
    draggable: false,
  },
  {
    component: "runtimeSwitch",
    indestructible: true,
    draggable: false,
  },
  {
    component: "display",
    draggable: false,
  },
  {
    component: "operationButtons",
    draggable: false,
  },
  {
    component: "digitalBlock",
    draggable: false,
  },
  {
    component: "equalizationButton",
    draggable: false,
  },
];

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <DndProvider options={HTML5toTouch}>
        <div className='bg-neutral-200 h-screen w-screen flex justify-center items-center'>
          <Container externalClassnames='bg-white w-[695px] h-[640px] flex justify-between py-10 px-20 pb-[86px]'>
            <Container externalClassnames='pt-[68px]'>
              <Canvas componentsShadow existingComponents={sidebarComponents} />
            </Container>
            <Container>
              <Canvas existingComponents={canvasComponents} />
            </Container>
          </Container>
        </div>
      </DndProvider>
    </Provider>
  );
};
