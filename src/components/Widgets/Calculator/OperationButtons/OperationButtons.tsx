import { useRef } from "react";
import { CanvasComponentProps } from "types/Canvas";
import { useCanvasWidget } from "../useCanvasWidget";

export const OperationButtons: React.FC<CanvasComponentProps> = ({ canvasId, componentId }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { componentState } = useCanvasWidget(canvasId, componentId, componentRef, "operationButtons");

  return <div ref={componentRef}>operation buttons</div>;
};
