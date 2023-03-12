import { useEffect, useRef, useState } from "react";
import { Canvas } from "types/Canvas";
import { useAction, useAppSelector } from "redux/helpers";
import { CanvasComponent, CanvasExistingComponent } from "types/Canvas/Canvas.components";
import { useRuntime } from "../useRuntime";
import { useDrop } from "react-dnd";

export type DrawLineProps = { active: boolean; index: number };

export const useCanvas = (maxComponents: number, existingComponents?: CanvasExistingComponent[]) => {
  const { addNewCanvas, removeCanvas } = useAction();
  const state = useAppSelector((state) => state.canvas);
  const { current } = useRef(new Canvas(maxComponents, existingComponents));

  const [canvasState, setCanvasState] = useState<Canvas>(current);
  const { runtime } = useRuntime(canvasState);

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

  const [drawLine, setDrawLine] = useState<DrawLineProps>({ active: false, index: 0 });
  const [canCanvasDrop, setCanCanvasDrop] = useState<boolean>(true);
  const [{ canDrop, isOver, hoveredItem }, drop] = useDrop({
    accept: "canvasWidget",
    drop: () => ({ canvasId: canvasState.id }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      hoveredItem: monitor.getItem<{ uuid: string; type: CanvasComponent["id"] }>(),
    }),
    canDrop: () => {
      return canCanvasDrop;
    },
  });
  useEffect(() => {
    if (runtime) return setDrawLine((prev) => ({ ...prev, active: false }));
    if (isOver) {
      setDrawLine((prev) => ({ ...prev, active: canCanvasDrop }));
    } else {
      setDrawLine((prev) => ({ ...prev, active: false }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOver, runtime, canCanvasDrop]);

  useEffect(() => {
    if (runtime) return setCanCanvasDrop(false);
    if (hoveredItem && !canvasState.components.find((c) => c.type === hoveredItem.type)) {
      setCanCanvasDrop(true);
    } else {
      setCanCanvasDrop(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredItem]);

  return {
    canvasState,
    runtime,
    dnd: {
      canDrop,
      isOver,
      drop,
      drawLine,
    },
  };
};
