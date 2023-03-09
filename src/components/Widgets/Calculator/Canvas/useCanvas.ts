import { useEffect, useRef, useState } from "react";
import { Canvas } from "types/Canvas";
import { useAction, useAppSelector } from "redux/helpers";
import { CanvasExistingComponent } from "types/Canvas/Canvas.components";
import { useRuntime } from "../useRuntime";

export const useCanvas = (existingComponents?: CanvasExistingComponent[]) => {
  const { addNewCanvas, removeCanvas } = useAction();
  const state = useAppSelector((state) => state.canvas);
  const { current } = useRef(new Canvas(existingComponents));

  const [canvasState, setCanvasState] = useState<Canvas>(current);
  const runtime = useRuntime(canvasState);

  useEffect(() => {
    const currentCanvas = state.canvases.find((c) => c.id === current.id);
    if (currentCanvas) setCanvasState(currentCanvas);
  }, [current.id, state.canvases]);

  useEffect(() => {
    addNewCanvas({ ...current });

    return () => {
      removeCanvas({ id: current.id });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    canvasState,
    runtime,
  };
};
