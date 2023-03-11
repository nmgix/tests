import React from "react";
import { useRef } from "react";
import {
  CanvasComponent,
  CanvasComponentProps,
  CanvasComponentsObject,
  DragCanvasWidgetProps,
} from "types/Canvas/Canvas.components";
import { useCanvasWidget } from "../useCanvasWidget";

const createComponent = (component: CanvasComponent, props: DragCanvasWidgetProps) => {
  const neededComponent = CanvasComponentsObject[component.type as keyof typeof CanvasComponentsObject];

  return React.createElement(neededComponent.component, {
    key: component.id,
    ...props,
  });
};

export const DragCanvasWidget: React.FC<CanvasComponentProps & { child: CanvasComponent }> = ({
  canvasId,
  id,
  componentsShadow,
  draggable,
  indestructible,
  index,
  child,
}) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const { canvas, componentState, dnd, runtime, state } = useCanvasWidget(
    canvasId,
    id,
    componentRef,
    indestructible,
    draggable,
    index
  );

  return (
    <div ref={dnd.drag} className={"translate-x-0 translate-y-0"}>
      {createComponent(child, {
        canvas,
        canvasId,
        componentRef,
        componentsShadow,
        componentState,
        draggable,
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
