import { useEffect, useRef, useState } from "react";
import { Canvas } from "types/Canvas";
import { useAction, useAppSelector } from "redux/helpers";
import { CanvasComponent, CanvasExistingComponent } from "types/Canvas/Canvas.components";
import { useRuntime } from "../useRuntime";
import { useDrop } from "react-dnd";

export type DrawLineProps = { active: boolean; lineIndex: number; fromIndex: number };

export const useCanvas = (maxComponents: number, existingComponents?: CanvasExistingComponent[]) => {
  const { addNewCanvas, removeCanvas } = useAction();
  const state = useAppSelector((state) => state.canvas);
  const { current } = useRef(new Canvas(maxComponents, existingComponents));

  const [canvasState, setCanvasState] = useState<Canvas>(current);
  const { runtime } = useRuntime(canvasState);

  // отслеживание компонента из стейта
  useEffect(() => {
    const currentCanvas = state.canvases.find((c) => c.id === current.id);
    if (currentCanvas) setCanvasState(currentCanvas);
  }, [current.id, state.canvases]);

  // создание канваса в сторе
  useEffect(() => {
    addNewCanvas({ ...current });

    return () => {
      removeCanvas({ id: current.id });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // линия dnd и dnd логика в общем
  const [drawLine, setDrawLine] = useState<DrawLineProps>({ active: false, lineIndex: 0, fromIndex: 0 });
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
    hover: (item) => {
      if (canvasState.components.length < canvasState.maxItemsIndex) {
        setDrawLine({
          active: true,
          lineIndex: canvasState.components.length,
          fromIndex: (item as { index: number }).index,
        });
      }
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

  // пересекаемые элементы
  const [intersectingElements, setIntersectingElements] = useState<string[]>([]);
  useEffect(() => {
    const idArr: string[] = [];

    const otherCanvases = state.canvases.filter((c) => c.id !== canvasState.id);

    canvasState.components.some((stateComponent) => {
      if (idArr.length === canvasState.components.length) return true;

      let found = false;
      if (stateComponent.indestructible && stateComponent.draggable) {
        otherCanvases.some((otherCanv) => {
          if (found) return true;
          return otherCanv.components.some((otherCanvComponent) => {
            if (otherCanvComponent && otherCanvComponent.type === stateComponent.type) {
              found = true;
              idArr.push(stateComponent.id);
              return true;
            } else {
              return false;
            }
          });
        });
        return false;
      } else {
        return false;
      }
    });

    setIntersectingElements(idArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.canvases]);

  return {
    canvasState,
    runtime,
    dnd: {
      canDrop,
      isOver,
      drop,
      drawLine,
      setDrawLine,
    },
    intersectingElements,
  };
};
