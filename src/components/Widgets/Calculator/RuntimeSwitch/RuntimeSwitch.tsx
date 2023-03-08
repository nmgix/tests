import { useRef } from "react";
import { CanvasComponentProps } from "types/Canvas";
import { useCanvasWidget } from "../useCanvasWidget";
import { useRuntimeSwitch } from "./useRuntimeSwitch";

export const RuntimeSwitch: React.FC<CanvasComponentProps> = ({ canvasId, componentId }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { canvas } = useCanvasWidget(canvasId, componentId, componentRef, true);
  const { switchFunc } = useRuntimeSwitch(canvas);

  return (
    <div ref={componentRef}>
      <span>runtime switch</span>{" "}
      <button className='bg-gray-500' onClick={switchFunc}>
        switch
      </button>
    </div>
  );
};
