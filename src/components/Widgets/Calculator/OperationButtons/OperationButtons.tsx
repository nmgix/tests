import { useRef } from "react";
import { CanvasComponentProps } from "types/Canvas/Canvas.components";
import { useCanvasWidget } from "../useCanvasWidget";
import { useStorageModifier } from "../useStorageModifier";

export const OperationButtons: React.FC<CanvasComponentProps> = ({ canvasId, componentId, indestructible }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { canvas, runtime, componentState } = useCanvasWidget(canvasId, componentId, componentRef, indestructible);
  const { updateData } = useStorageModifier(canvas, runtime, componentState);

  const operations: {
    operation: string;
    symbol: string;
  }[] = [
    {
      operation: "/",
      symbol: "/",
    },
    {
      operation: "*",
      symbol: "X",
    },
    {
      operation: "-",
      symbol: "-",
    },
    {
      operation: "+",
      symbol: "+",
    },
  ];

  return (
    <div ref={componentRef} className='p-1 bg-white rounded-md shadow-md'>
      <ul className='w-full flex spaced-x-8 justify-between'>
        {operations.map((o) => (
          <li className='text-sm text-black font-medium rounded-md border border-solid border-outline-100 flex justify-center align-middle'>
            <button className='w-[50px] h-[46px]' onClick={() => updateData(o.operation)}>
              {o.symbol}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
