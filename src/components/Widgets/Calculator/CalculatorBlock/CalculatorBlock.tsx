import { useRef } from "react";
import { CanvasComponentProps } from "types/Canvas/Canvas.components";
import { useCanvasWidget } from "../useCanvasWidget";
import { useCalculator } from "./useCalculator";

export const CalculatorBlock: React.FC<CanvasComponentProps> = ({ canvasId, componentId }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { canvas, componentState } = useCanvasWidget(canvasId, componentId, componentRef, "calculator", true);
  const { evalData } = useCalculator(canvasId);

  return <></>;
};
