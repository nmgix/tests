import { useAction } from "redux/helpers";
import { Canvas } from "types/Canvas/Canvas";
import { RuntimeSwitchComponent } from "types/Canvas/Canvas.components";

export const useRuntimeSwitch = (canvas: Canvas | undefined, canvasId: string, componentId: string) => {
  const { changeComponentData } = useAction();

  const switchFunc = () => {
    if (canvas) {
      const newComponentData = canvas.components.find(
        (component) => component.id === componentId
      ) as RuntimeSwitchComponent;

      if (newComponentData) {
        newComponentData.runtime = !newComponentData.runtime;
        changeComponentData({ canvasId, componentId, newComponentData });
      }
    }
  };

  return { switchFunc };
};
