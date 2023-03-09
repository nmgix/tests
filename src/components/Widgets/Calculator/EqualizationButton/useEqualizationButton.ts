import { useAction } from "redux/helpers";
import { Canvas } from "types/Canvas";
import { StorageComponent, CanvasComponents } from "types/Canvas/Canvas.components";
import { useRuntime } from "../useRuntime";
import { evaluate } from "mathjs";
import { StorageValues } from "types/Storage";

export const useEqualizationButton = (canvas: Canvas | undefined, componentState: CanvasComponents | null) => {
  const { changeComponentData } = useAction();
  const runtime = useRuntime(canvas);

  const calculateData = () => {
    if (!canvas || !componentState || !runtime) return;
    const storage = canvas.components.find((c) => c.type === "storage") as StorageComponent;
    if (!storage) return;
    const newComponentData = { ...storage };
    try {
      const evaluated = (newComponentData.storedValue = evaluate(newComponentData.storedValue)).toString();
      newComponentData.storedValue = isFinite(evaluated) ? evaluated : StorageValues.infinity;
    } catch (error) {
      newComponentData.storedValue = StorageValues.infinity;
    }
    changeComponentData({ canvasId: canvas.id, componentId: storage.id, newComponentData });
  };

  return {
    calculateData,
  };
};
