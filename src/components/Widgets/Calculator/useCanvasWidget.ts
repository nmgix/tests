import { useCallback, useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { useAction, useAppSelector } from "redux/helpers";
import { Canvas, CanvasState } from "types/Canvas";
import { CanvasComponent, CanvasComponentsObject } from "types/Canvas/Canvas.components";
import { useRuntime } from "./useRuntime";

export const useCanvas = (state: CanvasState, canvasId: string) => {
  const [canvas, setCanvas] = useState<Canvas | undefined>(undefined);
  useEffect(() => {
    if (state.canvases) {
      setCanvas(state.canvases.find((canvas) => canvas.id === canvasId));
    }
  }, [state.canvases, canvasId]);

  return canvas;
};

export const useCanvasWidget = (
  canvasId: string,
  componentId: string,
  componentRef: React.RefObject<HTMLDivElement>,
  indestructible: boolean,
  draggable: boolean,
  index: number
) => {
  const { addComponent, removeComponent } = useAction();
  const state = useAppSelector((state) => state.canvas);
  const canvas = useCanvas(state, canvasId);
  const { runtime, runtimeExists } = useRuntime(canvas);

  // состояние компонента
  const [componentState, setComponentState] = useState<CanvasComponent | null>(null);
  useEffect(() => {
    if (!canvas) return;
    const currentComponent = canvas.components.find((c) => c.id === componentId);
    if (!currentComponent) return;
    setComponentState(currentComponent);
  }, [canvas, componentId]);

  // удаление по двойному нажатию
  const onClickHandler = useCallback(
    (event: MouseEvent) => {
      if (indestructible || runtime) return;
      if (event.detail === 2) {
        removeComponent({ canvasId, componentId });
      }
    },
    [canvasId, componentId, indestructible, removeComponent, runtime]
  );
  useEffect(() => {
    let node = componentRef.current;
    if (node) componentRef.current?.addEventListener("click", onClickHandler);
    return () => {
      node?.removeEventListener("click", onClickHandler);
    };
  }, [componentRef, onClickHandler]);

  const [{ isDragging }, drag] = useDrag({
    item: { uuid: componentState?.id, type: componentState?.type },
    type: "canvasWidget",
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
    canDrag: () => {
      return runtime
        ? false
        : runtimeExists && componentState?.undraggableInConstructor
        ? !componentState?.undraggableInConstructor
        : draggable;
    },
    end: (draggedItem, monitor) => {
      const dropCanvas = monitor.getDropResult<{ canvasId: string }>();
      if (!dropCanvas || !draggedItem.type) return;
      const neededClass = CanvasComponentsObject[draggedItem.type as keyof typeof CanvasComponentsObject].class;
      const classInstance = new neededClass(draggedItem.type, true);
      addComponent({ canvasId: dropCanvas.canvasId, component: { ...classInstance } });
    },
  });

  return {
    componentState,
    state,
    canvas,
    runtime,
    dnd: {
      isDragging,
      drag,
    },
  };
};
