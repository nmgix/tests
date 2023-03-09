import { useRef } from "react";
import { CanvasComponentProps, RuntimeSwitchComponent } from "types/Canvas/Canvas.components";
import { useCanvasWidget } from "../useCanvasWidget";
import { useRuntimeSwitch } from "./useRuntimeSwitch";

export const RuntimeSwitch: React.FC<CanvasComponentProps> = ({ canvasId, componentId }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { canvas, componentState } = useCanvasWidget(canvasId, componentId, componentRef, true);
  const { switchFunc } = useRuntimeSwitch(canvas, componentState as RuntimeSwitchComponent);

  return (
    <div ref={componentRef}>
      <span>{(componentState as RuntimeSwitchComponent)?.runtime ? "runtime" : "constructor"}</span>
      <button className='bg-gray-500' onClick={switchFunc}>
        switch
      </button>
    </div>
  );
};
