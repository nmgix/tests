import classNames from "classnames";
import { useRef } from "react";
import { CanvasComponentProps } from "types/Canvas/Canvas.components";
import { useCanvasWidget } from "../useCanvasWidget";
import { useEqualizationButton } from "./useEqualizationButton";

export const EqualizationButton: React.FC<CanvasComponentProps> = ({
  canvasId,
  componentId,
  indestructible,
  componentsShadow,
}) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { canvas, componentState } = useCanvasWidget(canvasId, componentId, componentRef, indestructible);
  const { calculateData } = useEqualizationButton(canvas, componentState);

  return (
    <div ref={componentRef} className={classNames("w-full p-1 rounded-md", componentsShadow && "shadow-md")}>
      <button
        className='bg-iris-100 rounded-md text-white text-sm py-5 w-full font-medium active:bg-iris-200'
        onClick={calculateData}>
        =
      </button>
    </div>
  );
};
