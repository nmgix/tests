import classNames from "classnames";
import { useRef } from "react";
import { CanvasComponentProps } from "types/Canvas/Canvas.components";
import { useCanvasWidget } from "../useCanvasWidget";
import { useStorageModifier } from "../useStorageModifier";

export const OperationButtons: React.FC<CanvasComponentProps> = ({
  canvasId,
  componentId,
  indestructible,
  componentsShadow,
}) => {
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
    <div ref={componentRef} className={classNames("p-1 bg-white rounded-md", componentsShadow && "shadow-md")}>
      <ul className='w-full flex spaced-x-8 justify-between'>
        {operations.map((o) => (
          <li
            key={o.operation}
            className='text-sm text-black font-medium rounded-md border border-outline-100 border-solid flex justify-center align-middle hover:shadow-button'>
            <button className='w-[50px] h-[46px]' onClick={() => updateData(o.operation)}>
              {o.symbol}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
