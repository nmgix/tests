import { useEffect, useRef, useState } from "react";
import { useAction, useAppSelector } from "redux/helpers";
import { Canvas, CanvasComponent, CanvasComponentsSelector, CanvasState } from "types/Canvas";

export const useCanvas = (state: CanvasState, canvasId: string) => {
  const [canvas, setCanvas] = useState<Canvas | undefined>(undefined);
  useEffect(() => {
    if (state.canvases) {
      setCanvas(state.canvases.find((canvas) => canvas.id === canvasId));
    }
  }, [state.canvases]);

  return canvas;
};

export const useCanvasWidget = (
  canvasId: string,
  componentId: string,
  componentRef: React.RefObject<HTMLDivElement>,
  widgetType: CanvasComponentsSelector.CanvasComponents["type"],
  indestructible: boolean
) => {
  const { addComponent, removeComponent } = useAction();
  const state = useAppSelector((state) => state.canvas);
  const canvas = useCanvas(state, canvasId);

  // состояние компонента
  const [componentState, setComponentState] = useState<CanvasComponent>();

  // дорогостоящее обновление состояние компонента
  useEffect(() => {
    if (canvas) {
      const canvasComponent = canvas.components.find((cc) => cc.id === componentId);
      // если элемент существует на канвасе, проверка необходима для добавления в стор элементов,
      // установленных в канвасе принудительно (Runtime и Calculator (они не добавляются сторонними методами т.к. их рендер зависит от состояния компонента Canvas))
      if (canvasComponent) {
        // @ts-ignore
        setComponentState(canvasComponent);
      } else {
        // создать необходимый, подходящий класс
        const neededClass = CanvasComponentsSelector.getSuitableClass(widgetType);
        if (!neededClass) return;

        // @ts-ignore
        const classInstance: CanvasComponentsSelector.CanvasComponents = new neededClass(undefined, componentId);
        // const neededInstance = { ...classInstance } as Partial<CanvasComponentsSelector.CanvasComponents>;
        // delete neededInstance.component;
        addComponent({
          canvasId: canvas.id,
          // component: { ...neededInstance } as CanvasComponentsSelector.CanvasComponents,
          component: { ...classInstance } as CanvasComponentsSelector.CanvasComponents,
        });
      }
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
  }, []);

  return {
    componentState,
    state,
    canvas,
  };
};
