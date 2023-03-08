import { useRef } from "react";
import { CanvasComponentProps } from "types/Canvas";
import { useCanvasWidget } from "../useCanvasWidget";

export const Display: React.FC<CanvasComponentProps> = ({ canvasId, componentId, indestructible }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { componentState } = useCanvasWidget(canvasId, componentId, componentRef, "display", indestructible);

  return <div ref={componentRef}>display</div>;
};
