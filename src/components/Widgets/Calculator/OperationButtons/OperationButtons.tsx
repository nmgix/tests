import { useRef } from "react";
import { CanvasComponentProps } from "types/Canvas/Canvas.components";
import { useCanvasWidget } from "../useCanvasWidget";

export const OperationButtons: React.FC<CanvasComponentProps> = ({ canvasId, componentId, indestructible }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { componentState } = useCanvasWidget(canvasId, componentId, componentRef, "operationButtons", indestructible);

  return <div ref={componentRef}>operation buttons</div>;
};
