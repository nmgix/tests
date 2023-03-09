import { useRef } from "react";
import { CanvasComponentProps } from "types/Canvas/Canvas.components";
import { useCanvasWidget } from "../useCanvasWidget";
import { useDisplay } from "./useDisplay";

export const Display: React.FC<CanvasComponentProps> = ({ canvasId, componentId, indestructible }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { canvas } = useCanvasWidget(canvasId, componentId, componentRef, indestructible);
  const drawData = useDisplay(canvas);

  return (
    <div ref={componentRef} className='rounded-md bg-white p-1 w-full shadow-md flex'>
      <span className='text-gray-900 bg-gray-100 rounded-md py-2 px-2 font-extrabold text-3xl flex-1 text-end'>
        {drawData}
      </span>
    </div>
  );
};
