import { useAction } from "redux/helpers";
import { Canvas, CanvasComponentsSelector } from "types/Canvas";

export const useRuntimeSwitch = (canvas: Canvas | undefined, canvasId: string, componentId: string) => {
  const { changeComponentData } = useAction();

  const switchFunc = () => {
    if (canvas) {
      const newComponentData = canvas.components.find(
        (component) => component.id === componentId
      ) as CanvasComponentsSelector.RuntimeSwitchComponent;

      if (newComponentData) {
        newComponentData.runtime = !newComponentData.runtime;
        changeComponentData({ canvasId, componentId, newComponentData });
      }
    }
  };

  return { switchFunc };
};
