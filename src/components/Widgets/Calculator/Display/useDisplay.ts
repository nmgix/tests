import { useEffect, useState } from "react";
import { Canvas } from "types/Canvas";
import { StorageComponent } from "types/Canvas/Canvas.components";

export const useDisplay = (canvas: Canvas | undefined) => {
  const [drawData, setDrawData] = useState<string>("");

  useEffect(() => {
    if (!canvas) return;
    const storage = canvas.components.find((c) => c.type === "storage") as StorageComponent;
    if (!storage) return;
    setDrawData(storage.storedValue.replace("*", ""));
  }, [canvas]);

  return drawData;
};
