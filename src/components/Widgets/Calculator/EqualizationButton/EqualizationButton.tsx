import { useRef } from "react";
import { CanvasComponentProps } from "types/Canvas/Canvas.components";
import { useCanvasWidget } from "../useCanvasWidget";

export const EqualizationButton: React.FC<CanvasComponentProps> = ({ canvasId, componentId, indestructible }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { componentState } = useCanvasWidget(canvasId, componentId, componentRef, "equalizationButton", indestructible);

  return <div ref={componentRef}>equalization button</div>;
};
