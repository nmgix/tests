import { useAction } from "redux/helpers";
import { Canvas } from "types/Canvas";
import { StorageComponent, CanvasComponent } from "types/Canvas/Canvas.components";
import { StorageValues } from "types/Storage";

export const useStorageModifier = (
  canvas: Canvas | undefined,
  runtime: boolean,
  componentState: CanvasComponent | null
) => {
  const { changeComponentData } = useAction();

  const updateData = (input: string) => {
    if (!canvas || !componentState || !runtime) return;
    if (typeof input !== "string") return false;
    const storage = canvas.components.find((c) => c.type === "storage") as StorageComponent;
    if (!storage) return;
    const newComponentData = { ...storage };
    if (newComponentData.storedValue === StorageValues.infinity) {
      newComponentData.storedValue = StorageValues.empty;
    }
    if (newComponentData.storedValue === StorageValues.empty) {
      if (input === "-" || (!isNaN(Number(input)) && !isNaN(parseFloat(input)))) {
        newComponentData.storedValue = input;
      }
    } else {
      newComponentData.storedValue += input;
    }
    changeComponentData({ canvasId: canvas.id, componentId: storage.id, newComponentData });
  };

  return {
    updateData,
  };
};
