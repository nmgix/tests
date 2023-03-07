import { useRef } from "react";
import { CanvasComponentProps } from "types/Canvas";
import { useCanvasWidget } from "../useCanvasWidget";

export const Display: React.FC<CanvasComponentProps> = ({ canvasId, componentId }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { componentState } = useCanvasWidget(canvasId, componentId, componentRef, "display");

  return <div ref={componentRef}>display</div>;
};
