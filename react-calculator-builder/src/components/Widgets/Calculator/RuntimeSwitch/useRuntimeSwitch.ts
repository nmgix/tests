import { useAction } from "redux/helpers";
import { Canvas } from "types/Canvas";
import { RuntimeSwitchComponent } from "types/Canvas/Canvas.components";

export const useRuntimeSwitch = (canvas: Canvas | undefined, componentState: RuntimeSwitchComponent | null) => {
  const { changeComponentData } = useAction();

  const switchFunc = (runtimeActive?: boolean) => {
    if (!canvas || !componentState) return;

    if (componentState) {
      const newComponentData = { ...componentState };
      newComponentData.runtime = runtimeActive ?? !newComponentData.runtime;
      changeComponentData({ canvasId: canvas.id, componentId: componentState?.id, newComponentData });
    }
  };

  return { switchFunc };
};
