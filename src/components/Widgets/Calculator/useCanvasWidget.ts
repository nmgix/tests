import { useEffect, useRef, useState } from "react";
import { useAction, useAppSelector } from "redux/helpers";
import { Canvas, CanvasComponent, CanvasState } from "types/Canvas";

const useCanvas = (state: CanvasState, canvasId: string) => {
  const [canvas, setCanvas] = useState<Canvas | undefined>(undefined);
  useEffect(() => {
    if (state.canvases) {
      setCanvas(state.canvases.find((canvas) => canvas.id == canvasId));
    }
  }, [state.canvases]);

  return canvas;
};

export const useCanvasWidget = (
  canvasId: string,
  componentId: string,
  componentRef: React.RefObject<HTMLDivElement>,
  indestructible: boolean
) => {
  const { removeComponent } = useAction();
  const state = useAppSelector((state) => state.canvas);
  const canvas = useCanvas(state, canvasId);

  // состояние компонента
  const [componentState, setComponentState] = useState<CanvasComponent>();

  // дорогостоящее обновление состояние компонента
  useEffect(() => {
    if (canvas) {
      const canvasComponent = canvas.components.find((cc) => cc.id === componentId);
      if (canvasComponent) setComponentState(canvasComponent);
    }
  }, [canvas?.components]);

  // удаление по двойному нажатию
  const timer = useRef<NodeJS.Timeout | null>(null);
  const onClickHandler = (event: MouseEvent) => {
    if (indestructible) return;
    if (timer.current) clearTimeout(timer.current);
    if (event.detail === 2) {
      removeComponent({ canvasId, componentId });
    }
  };
  useEffect(() => {
    componentRef.current?.addEventListener("click", onClickHandler);

    return () => {
      componentRef.current?.removeEventListener("click", onClickHandler);
    };
  });

  return {
    componentState,
    state,
    canvas,
  };
};
