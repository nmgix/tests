import { useRef } from "react";
import { CanvasComponentProps } from "types/Canvas/Canvas.components";
import { useCanvasWidget } from "../useCanvasWidget";
import { useDisplay } from "./useDisplay";

export const Display: React.FC<CanvasComponentProps> = ({ canvasId, componentId, indestructible }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { canvas } = useCanvasWidget(canvasId, componentId, componentRef, indestructible);
  const drawData = useDisplay(canvas);

  return (
    <div ref={componentRef}>
      <span>{drawData}</span>
    </div>
  );
};
