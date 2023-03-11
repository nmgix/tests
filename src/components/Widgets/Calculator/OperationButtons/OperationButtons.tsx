import classNames from "classnames";
import { DragCanvasWidgetProps } from "types/Canvas/Canvas.components";
import { useStorageModifier } from "../useStorageModifier";

export const OperationButtons: React.FC<DragCanvasWidgetProps> = ({
  componentsShadow,
  canvas,
  componentState,
  dnd: { drag, isDragging },
  runtime,
  componentRef,
}) => {
  const { updateData } = useStorageModifier(canvas, runtime, componentState);

  const opacity = isDragging ? 0.4 : 1;

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
    <div
      ref={componentRef}
      className={classNames("p-1 bg-white rounded-md", componentsShadow && "shadow-md")}
      style={{ opacity }}>
      <ul ref={drag} className='w-full flex spaced-x-8 justify-between'>
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
