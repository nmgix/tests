import { useRef } from "react";
import { CanvasComponentProps } from "types/Canvas";
import { useCanvasWidget } from "../useCanvasWidget";

export const EqualizationButton: React.FC<CanvasComponentProps> = ({ canvasId, componentId }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { componentState } = useCanvasWidget(canvasId, componentId, componentRef, "equalizationButton");

  return <div ref={componentRef}>equalization button</div>;
};
