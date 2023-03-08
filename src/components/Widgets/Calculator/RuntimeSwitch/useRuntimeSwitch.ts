import { useAction } from "redux/helpers";
import { Canvas } from "types/Canvas";

export const useRuntimeSwitch = (canvas: Canvas | undefined) => {
  const { switchRuntime } = useAction();

  const switchFunc = () => {
    if (canvas) switchRuntime({ canvasId: canvas.id });
  };

  return { switchFunc };
};
