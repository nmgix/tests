import { useRef } from "react";
import { CanvasComponentProps } from "types/Canvas/Canvas.components";
import { useCanvasWidget } from "../useCanvasWidget";
import { useStorageModifier } from "../useStorageModifier";

export const DigitalBlock: React.FC<CanvasComponentProps> = ({ canvasId, componentId, indestructible }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { canvas, runtime, componentState } = useCanvasWidget(canvasId, componentId, componentRef, indestructible);
  const { updateData } = useStorageModifier(canvas, runtime, componentState);

  return (
    <div ref={componentRef}>
      <ul>
        <li>
          <button onClick={() => updateData("7")}>7</button>
        </li>
        <li>
          <button onClick={() => updateData("8")}>8</button>
        </li>
        <li>
          <button onClick={() => updateData("9")}>9</button>
        </li>
        <li>
          <button onClick={() => updateData("4")}>4</button>
        </li>
        <li>
          <button onClick={() => updateData("5")}>5</button>
        </li>
        <li>
          <button onClick={() => updateData("6")}>6</button>
        </li>
        <li>
          <button onClick={() => updateData("1")}>1</button>
        </li>
        <li>
          <button onClick={() => updateData("2")}>2</button>
        </li>
        <li>
          <button onClick={() => updateData("3")}>3</button>
        </li>
        <li>
          <button onClick={() => updateData("0")}>0</button>
        </li>
        <li>
          <button onClick={() => updateData(",")}>,</button>
        </li>
      </ul>
    </div>
  );
};
