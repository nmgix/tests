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
      // eslint-disable-next-line no-useless-escape
      const regexp = /(\d[^\+\-\*\/]*)+/g;
      const storedValue = newComponentData.storedValue.split(regexp);

      // если значение число
      if (regexp.test(input)) {
        newComponentData.storedValue += input;
      } else {
        // если прошлый знак перед последним или последний равен не числу, то закончить
        if (
          (storedValue[storedValue.length - 2] !== undefined && isNaN(Number(storedValue[storedValue.length - 2]))) ||
          isNaN(Number(storedValue[storedValue.length - 1]))
        )
          return;
        newComponentData.storedValue += input;
      }
    }

    changeComponentData({ canvasId: canvas.id, componentId: storage.id, newComponentData });
  };

  return {
    updateData,
  };
};
