import { useEffect } from "react";
import { useAction } from "redux/helpers";
import { Canvas } from "types/Canvas";
import { StorageComponent } from "types/Canvas/Canvas.components";
import { StorageValues } from "types/Storage";
import { useRuntime } from "../useRuntime";

export const useStorage = (canvas: Canvas | undefined, componentState: StorageComponent | null) => {
  const { changeComponentData } = useAction();
  const runtime = useRuntime(canvas);

  useEffect(() => {
    if (!canvas || !componentState) return;
    if (runtime) return;
    if (componentState.storedValue === StorageValues.empty) return;

    const newComponentData = { ...componentState };
    newComponentData.storedValue = StorageValues.empty;
    changeComponentData({ canvasId: canvas.id, componentId: componentState.id, newComponentData });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runtime]);
};
