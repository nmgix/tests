import { useEffect, useState } from "react";
import { Canvas } from "types/Canvas";
import { StorageComponent } from "types/Canvas/Canvas.components";

export const useDisplay = (canvas: Canvas | undefined) => {
  const [drawData, setDrawData] = useState<string>("");

  useEffect(() => {
    if (!canvas) return;
    const storage = canvas.components.find((c) => c.type === "storage") as StorageComponent;
    if (!storage) return;
    // eslint-disable-next-line no-useless-escape
    let storageValue: string[] = storage.storedValue.split(/(\d[^\+\-\*\/]*)+/g);
    let displayValue: string = "";
    if (storageValue[0].length > 0) {
      displayValue += storageValue[0];
    }
    if (storageValue[1] !== undefined) {
      displayValue += storageValue[1];
    }

    setDrawData(displayValue);
  }, [canvas]);

  return drawData;
};
