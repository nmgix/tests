import { DragCanvasWidgetProps, StorageComponent } from "types/Canvas/Canvas.components";
import { useStorage } from "./useStorage";

export const StorageBlock: React.FC<DragCanvasWidgetProps> = ({ canvas, componentState }) => {
  useStorage(canvas, componentState as StorageComponent);

  return <></>;
};
