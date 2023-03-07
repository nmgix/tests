import { useRef } from "react";
import { CanvasComponentProps } from "types/Canvas";
import { useCanvasWidget } from "../useCanvasWidget";

export const RuntimeSwitch: React.FC<CanvasComponentProps> = ({ canvasId, componentId }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { componentState } = useCanvasWidget(canvasId, componentId, componentRef, "runtimeSwitch");

  return <div ref={componentRef}>runtime switch, {}</div>;
};
