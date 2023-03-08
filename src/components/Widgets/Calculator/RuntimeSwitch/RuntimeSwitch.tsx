import { useRef } from "react";
import { CanvasComponentProps } from "types/Canvas/Canvas.components";
import { useCanvasWidget } from "../useCanvasWidget";
import { useRuntimeSwitch } from "./useRuntimeSwitch";

// логику переключения runtime тоже желательно вынести из canvas
export const RuntimeSwitch: React.FC<CanvasComponentProps> = ({ canvasId, componentId }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { canvas } = useCanvasWidget(canvasId, componentId, componentRef, "runtimeSwitch", true);
  const { switchFunc } = useRuntimeSwitch(canvas, canvasId, componentId);

  return (
    <div ref={componentRef}>
      <span>runtime switch</span>{" "}
      <button className='bg-gray-500' onClick={switchFunc}>
        switch
      </button>
    </div>
  );
};
