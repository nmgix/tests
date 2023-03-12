import React from "react";
import { useRef } from "react";
import {
  CanvasComponent,
  CanvasComponentProps,
  CanvasComponentsObject,
  DragCanvasWidgetProps,
} from "types/Canvas/Canvas.components";
import { DrawLineProps } from "../Canvas/useCanvas";
import { useCanvasWidget } from "../useCanvasWidget";

const createComponent = (component: CanvasComponent, props: DragCanvasWidgetProps) => {
  const neededComponent = CanvasComponentsObject[component.type as keyof typeof CanvasComponentsObject];

  return React.createElement(neededComponent.component, {
    key: component.id,
    ...props,
  });
};

export const DragCanvasWidget: React.FC<
  CanvasComponentProps & {
    child: CanvasComponent;
    existsInAnotherCanvas: boolean;
    drawLine: DrawLineProps;
    setDrawLine: React.Dispatch<React.SetStateAction<DrawLineProps>>;
    maxItemsIndex: number;
  }
> = ({
  canvasId,
  id,
  componentsShadow,
  draggable,
  indestructible,
  index,
  child,
  existsInAnotherCanvas,
  drawLine,
  setDrawLine,
  maxItemsIndex,
}) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const { canvas, componentState, dnd, runtime, state } = useCanvasWidget(
    canvasId,
    id,
    componentRef,
    indestructible,
    draggable,
    index,
    drawLine,
    setDrawLine,
    existsInAnotherCanvas,
    maxItemsIndex
  );

  return (
    <div
      ref={dnd.drag}
      className={"translate-x-0 translate-y-0"}
      style={{ opacity: existsInAnotherCanvas ? "0.5" : 1 }}>
      {createComponent(child, {
        canvas,
        canvasId,
        componentRef,
        componentsShadow: existsInAnotherCanvas ? false : componentsShadow,
        componentState,
        draggable: draggable,
        indestructible,
        index,
        runtime,
        state,
        id,
        dnd,
      })}
    </div>
  );
};
