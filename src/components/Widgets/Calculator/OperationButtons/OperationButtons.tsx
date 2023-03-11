import classNames from "classnames";
import { DragCanvasWidgetProps, Operations } from "types/Canvas/Canvas.components";
import { useStorageModifier } from "../useStorageModifier";

export const OperationButtons: React.FC<DragCanvasWidgetProps> = ({
  componentsShadow,
  canvas,
  componentState,
  runtime,
  componentRef,
}) => {
  const operations: Operations = [
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

  const { updateData } = useStorageModifier(canvas, runtime, componentState, operations);

  return (
    <div ref={componentRef} className={classNames("p-1 bg-white rounded-md", componentsShadow && "shadow-md")}>
      <ul className='w-full flex spaced-x-8 justify-between'>
        {operations.map((o) => (
          <li
            key={o.operation}
            className='text-sm text-black font-medium rounded-md flex justify-center align-middle shadow-button hover:shadow-buttonHover'>
            <button className='w-[50px] h-[48px]' onClick={() => updateData(o.operation)}>
              {o.symbol}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
