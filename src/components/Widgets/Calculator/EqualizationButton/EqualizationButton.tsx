import classNames from "classnames";
import { DragCanvasWidgetProps } from "types/Canvas/Canvas.components";
import { useEqualizationButton } from "./useEqualizationButton";

export const EqualizationButton: React.FC<DragCanvasWidgetProps> = ({
  componentsShadow,
  canvas,
  componentState,
  componentRef,
}) => {
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
