import classNames from "classnames";
import { DragCanvasWidgetProps } from "types/Canvas/Canvas.components";
import { useDisplay } from "./useDisplay";
import { Textfit } from "react-textfit";

export const Display: React.FC<DragCanvasWidgetProps> = ({ componentsShadow, canvas, componentRef }) => {
  const drawData = useDisplay(canvas);

  return (
    <div
      ref={componentRef}
      className={classNames("bg-white p-1 w-full rounded-md flex text-3xl", componentsShadow && "shadow-md")}>
      <Textfit
        style={{ width: 230, height: 52 }}
        max={30}
        className='text-gray-900 bg-gray-100 rounded-md py-2 px-2 font-extrabold text-end'
        mode='single'>
        {drawData}
      </Textfit>
    </div>
  );
};
