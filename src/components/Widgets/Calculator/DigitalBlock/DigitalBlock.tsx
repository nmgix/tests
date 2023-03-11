import classNames from "classnames";
import { DragCanvasWidgetProps } from "types/Canvas/Canvas.components";
import { useStorageModifier } from "../useStorageModifier";

export const DigitalBlock: React.FC<DragCanvasWidgetProps> = ({
  canvas,
  componentRef,
  componentState,
  runtime,
  componentsShadow,
}) => {
  const { updateData } = useStorageModifier(canvas, runtime, componentState);

  const operations: {
    operation: string;
    size: {
      width: number;
      height: number;
    };
  }[] = [
    {
      operation: "7",
      size: {
        width: 1,
        height: 1,
      },
    },
    {
      operation: "8",
      size: {
        width: 1,
        height: 1,
      },
    },
    {
      operation: "9",
      size: {
        width: 1,
        height: 1,
      },
    },
    {
      operation: "4",
      size: {
        width: 1,
        height: 1,
      },
    },
    {
      operation: "5",
      size: {
        width: 1,
        height: 1,
      },
    },
    {
      operation: "6",
      size: {
        width: 1,
        height: 1,
      },
    },
    {
      operation: "1",
      size: {
        width: 1,
        height: 1,
      },
    },
    {
      operation: "2",
      size: {
        width: 1,
        height: 1,
      },
    },
    {
      operation: "3",
      size: {
        width: 1,
        height: 1,
      },
    },
    {
      operation: "0",
      size: {
        width: 2,
        height: 1,
      },
    },
    {
      operation: ",",
      size: {
        width: 1,
        height: 1,
      },
    },
  ];

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
              {o.operation}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
