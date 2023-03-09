import { useEffect } from "react";
import { useAction } from "redux/helpers";
import { Canvas } from "types/Canvas";
import { StorageComponent } from "types/Canvas/Canvas.components";
import { useRuntime } from "../useRuntime";

export const useStorage = (canvas: Canvas | undefined, componentState: StorageComponent | null) => {
  const { changeComponentData } = useAction();
  const runtime = useRuntime(canvas);

  useEffect(() => {
    if (!canvas || !componentState) return;
    if (!runtime) {
      if (componentState.storedValue.length === 0) return;

      const newComponentData = { ...componentState };
      newComponentData.storedValue = "";
      changeComponentData({ canvasId: canvas.id, componentId: componentState.id, newComponentData });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentState?.storedValue, runtime]);
};
