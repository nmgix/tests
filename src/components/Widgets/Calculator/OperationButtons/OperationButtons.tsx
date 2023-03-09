import { useRef } from "react";
import { CanvasComponentProps } from "types/Canvas/Canvas.components";
import { useCanvasWidget } from "../useCanvasWidget";
import { useStorageModifier } from "../useStorageModifier";

export const OperationButtons: React.FC<CanvasComponentProps> = ({ canvasId, componentId, indestructible }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { canvas, componentState } = useCanvasWidget(canvasId, componentId, componentRef, indestructible);
  const { updateData } = useStorageModifier(canvas, componentState);

  return (
    <div ref={componentRef}>
      <ul>
        <li>
          <button onClick={() => updateData("/")}>/</button>
        </li>
        <li>
          <button onClick={() => updateData("*")}>X</button>
        </li>
        <li>
          <button onClick={() => updateData("-")}>-</button>
        </li>
        <li>
          <button onClick={() => updateData("+")}>+</button>
        </li>
      </ul>
    </div>
  );
};
