import { useAction } from "redux/helpers";
import { Canvas } from "types/Canvas";
import { StorageComponent, CanvasComponents } from "types/Canvas/Canvas.components";
import { useRuntime } from "./useRuntime";

export const useStorageModifier = (canvas: Canvas | undefined, componentState: CanvasComponents | null) => {
  const { changeComponentData } = useAction();
  const runtime = useRuntime(canvas);

  const updateData = (input: string) => {
    if (!canvas || !componentState || !runtime) return;
    const storage = canvas.components.find((c) => c.type === "storage") as StorageComponent;
    if (!storage) return;
    const newComponentData = { ...storage };
    newComponentData.storedValue += input;
    changeComponentData({ canvasId: canvas.id, componentId: storage.id, newComponentData });
  };

  return {
    updateData,
  };
};
