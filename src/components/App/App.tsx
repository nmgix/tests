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
    component: "operationButtons",
    indestructible: true,
    draggable: true,
    undraggableInConstructor: true,
  },
  {
    component: "digitalBlock",
    indestructible: true,
    draggable: true,
    undraggableInConstructor: true,
  },
  {
    component: "display",
    indestructible: true,
    draggable: true,
    undraggableInConstructor: true,
  },
  {
    component: "equalizationButton",
    indestructible: true,
    draggable: true,
    undraggableInConstructor: true,
  },
  {
    component: "storage",
    indestructible: true,
    draggable: true,
    undraggableInConstructor: true,
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
  // {
  //   component: "operationButtons",
  //   draggable: false,
  // },
  // {
  //   component: "digitalBlock",
  //   draggable: false,
  // },
  // {
  //   component: "equalizationButton",
  //   draggable: false,
  // },
];

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <DndProvider options={HTML5toTouch}>
        <div className='bg-neutral-200 min-h-screen h-full w-screen flex justify-center items-center'>
          <Container externalClassnames='bg-white md:w-[695px] mx-4 my-4 flex justify-between items-stretch flex-col md:flex-row py-10 px-20 pb-[86px] spaced-y-12 md:spaced-y-0'>
            <Container externalClassnames='pt-[68px]'>
              <Canvas maxItemsIndex={5} componentsShadow existingComponents={sidebarComponents} />
            </Container>
            <Container>
              <Canvas maxItemsIndex={6} existingComponents={canvasComponents} />
            </Container>
          </Container>
        </div>
      </DndProvider>
    </Provider>
  );
};
