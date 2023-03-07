import { useRef } from "react";
import { CanvasComponentProps } from "types/Canvas";
import { useCanvasWidget } from "../useCanvasWidget";

export const DigitalBlock: React.FC<CanvasComponentProps> = ({ canvasId, componentId }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { componentState } = useCanvasWidget(canvasId, componentId, componentRef, "digitalBlock");

  return <div ref={componentRef}>digital block</div>;
};
