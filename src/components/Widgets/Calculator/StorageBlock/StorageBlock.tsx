import { useRef } from "react";
import { CanvasComponentProps, StorageComponent } from "types/Canvas/Canvas.components";
import { useCanvasWidget } from "../useCanvasWidget";
import { useStorage } from "./useStorage";

export const StorageBlock: React.FC<CanvasComponentProps> = ({ canvasId, componentId }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { canvas, componentState } = useCanvasWidget(canvasId, componentId, componentRef, true);
  useStorage(canvas, componentState as StorageComponent);

  return <></>;
};
