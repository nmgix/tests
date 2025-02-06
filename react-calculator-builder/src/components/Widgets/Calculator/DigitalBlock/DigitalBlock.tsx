import classNames from "classnames";
import { DragCanvasWidgetProps, Operations } from "types/Canvas/Canvas.components";
import { useStorageModifier } from "../useStorageModifier";

export const DigitalBlock: React.FC<DragCanvasWidgetProps> = ({
  canvas,
  componentRef,
  componentState,
  runtime,
  componentsShadow,
}) => {
  const operations: Operations = [
    {
      operation: "7",
      symbol: "7",
      size: {
        width: 1,
        height: 1,
      },
    },
    {
      operation: "8",
      symbol: "8",
      size: {
        width: 1,
        height: 1,
      },
    },
    {
      operation: "9",
      symbol: "9",
      size: {
        width: 1,
        height: 1,
      },
    },
    {
      operation: "4",
      symbol: "4",
      size: {
        width: 1,
        height: 1,
      },
    },
    {
      operation: "5",
      symbol: "5",
      size: {
        width: 1,
        height: 1,
      },
    },
    {
      operation: "6",
      symbol: "6",
      size: {
        width: 1,
        height: 1,
      },
    },
    {
      operation: "1",
      symbol: "1",
      size: {
        width: 1,
        height: 1,
      },
    },
    {
      operation: "2",
      symbol: "2",
      size: {
        width: 1,
        height: 1,
      },
    },
    {
      operation: "3",
      symbol: "3",
      size: {
        width: 1,
        height: 1,
      },
    },
    {
      operation: "0",
      symbol: "0",
      size: {
        width: 2,
        height: 1,
      },
    },
    {
      operation: ".",
      symbol: ",",
      size: {
        width: 1,
        height: 1,
      },
    },
  ];
  const { updateData } = useStorageModifier(canvas, runtime, componentState, operations);

  return (
    <div ref={componentRef} className={classNames("bg-white rounded-md", componentsShadow && "shadow-md")}>
      <ul className='grid grid-cols-3 gap-2 p-1'>
        {operations.map((o) => (
          <li
            key={o.operation}
            className={classNames(
              // такой косяк обсуждается в переходе на Tailwind V3
              o.size.width === 2 ? "col-span-2" : "col-span-1",
              `row-span-${o.size.height}`,
              "text-center rounded-md shadow-button hover:shadow-buttonHover"
            )}>
            <button className='h-[48px] w-full' onClick={() => updateData(o.operation)}>
              {o.symbol}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
