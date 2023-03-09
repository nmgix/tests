import { useEffect, useState } from "react";
import { Canvas } from "types/Canvas";
import { StorageComponent } from "types/Canvas/Canvas.components";
import { StorageValues } from "types/Storage";

export const useDisplay = (canvas: Canvas | undefined) => {
  const [drawData, setDrawData] = useState<string>("");

  useEffect(() => {
    if (!canvas) return;
    const storage = canvas.components.find((c) => c.type === "storage") as StorageComponent;
    if (!storage) return;
    let displayValue: string =
      storage.storedValue === StorageValues.infinity
        ? StorageValues.infinity
        : storage.storedValue.split(/[^\d.-]+/g)[0];
    setDrawData(displayValue);
  }, [canvas]);

  return drawData;
};
