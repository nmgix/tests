import { useAction } from "redux/helpers";
import { Canvas } from "types/Canvas";
import { StorageComponent, CanvasComponent, Operations } from "types/Canvas/Canvas.components";
import { Regexp } from "types/Operation";
import { StorageValues } from "types/Storage";
import { useKey } from "./useKey";

export const useStorageModifier = (
  canvas: Canvas | undefined,
  runtime: boolean,
  componentState: CanvasComponent | null,
  operations: Operations
) => {
  const { changeComponentData } = useAction();

  const updateData = (input: string) => {
    if (!canvas || !componentState || !runtime || typeof input !== "string") return;

    const storage = canvas.components.find((c) => c.type === "storage") as StorageComponent;
    if (!storage) return;

    const newComponentData = { ...storage };

    // если прошлое значение бесконечность, то обнулить
    if (newComponentData.storedValue === StorageValues.infinity) {
      newComponentData.storedValue = StorageValues.empty;
    }

    // если значение нулевое
    if (newComponentData.storedValue === StorageValues.empty) {
      // знак равен минусу или числу
      if (input === "-" || (!isNaN(Number(input)) && !isNaN(parseFloat(input)))) {
        newComponentData.storedValue = input;
      }
      // если значение не нулевое
    } else {
      const storedValue = newComponentData.storedValue.split(Regexp);
      // если предпоследнее значение число или последнее значение не пустое и ввод равен числу
      if (
        (storedValue[storedValue.length - 2] !== undefined &&
          storedValue[storedValue.length - 2].length > 0 &&
          !isNaN(Number(storedValue[storedValue.length - 2]))) ||
        (storedValue[storedValue.length - 2] === undefined && !isNaN(Number(input)))
      ) {
        newComponentData.storedValue += input;
      }
    }

    changeComponentData({ canvasId: canvas.id, componentId: storage.id, newComponentData });
  };

  useKey(
    operations.map((o) => o.operation),
    updateData,
    canvas,
    runtime
  );

  return {
    updateData,
  };
};
