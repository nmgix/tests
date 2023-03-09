import { useRef } from "react";
import { CanvasComponentProps } from "types/Canvas/Canvas.components";
import { useCanvasWidget } from "../useCanvasWidget";
import { useEqualizationButton } from "./useEqualizationButton";

export const EqualizationButton: React.FC<CanvasComponentProps> = ({ canvasId, componentId, indestructible }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { canvas, componentState } = useCanvasWidget(canvasId, componentId, componentRef, indestructible);
  const { calculateData } = useEqualizationButton(canvas, componentState);

  return (
    <div ref={componentRef}>
      <button onClick={calculateData}>=</button>
    </div>
  );
};
