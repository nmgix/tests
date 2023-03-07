import { useEffect, useState } from "react";
import { Canvas, CanvasComponentsKeyArray } from "types/Canvas";
import { useAction, useAppSelector } from "redux/helpers";

export const useCanvas = (existingComponents?: CanvasComponentsKeyArray) => {
  const { addNewCanvas, removeCanvas } = useAction();
  const state = useAppSelector((state) => state.canvas);
  const canvas = new Canvas(existingComponents);

  const [canvasState, setCanvasState] = useState<Canvas>(canvas);

  useEffect(() => {
    const currentCanvas = state.canvases.find((c) => c.id === canvas.id);
    if (currentCanvas) setCanvasState(currentCanvas);
  }, [canvas.id, state.canvases]);

  useEffect(() => {
    addNewCanvas({ ...canvas });

    return () => {
      removeCanvas({ id: canvas.id });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    canvasState,
  };
};
