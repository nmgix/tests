import classNames from "classnames";
import { Icon } from "components/Icon";
import { useRef } from "react";
import { CanvasComponentProps, RuntimeSwitchComponent } from "types/Canvas/Canvas.components";
import { Colors } from "types/Colors";
import { useCanvasWidget } from "../useCanvasWidget";
import { useRuntimeSwitch } from "./useRuntimeSwitch";

export const RuntimeSwitch: React.FC<CanvasComponentProps> = ({ canvasId, componentId }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { canvas, componentState } = useCanvasWidget(canvasId, componentId, componentRef, true);
  const { switchFunc } = useRuntimeSwitch(canvas, componentState as RuntimeSwitchComponent);

  return (
    <div ref={componentRef} className='rounded-md bg-gray-100 flex p-px text-font-alter font-medium text-sm mb-[30px]'>
      <button
        onClick={() => switchFunc(true)}
        className={classNames(
          "flex rounded-md items-center py-2 px-3",
          (componentState as RuntimeSwitchComponent)?.runtime && "bg-white border-solid border-outline-100"
        )}>
        <Icon
          name='eye'
          stroke={(componentState as RuntimeSwitchComponent)?.runtime ? Colors.iris : Colors.gray}
          size='20'
        />
        <span className='ml-2'>Runtime</span>
      </button>
      <button
        onClick={() => switchFunc(false)}
        className={classNames(
          "flex rounded-md items-center py-2 px-3",
          !(componentState as RuntimeSwitchComponent)?.runtime && "bg-white border-solid border-outline-100"
        )}>
        <Icon
          name='selector'
          stroke={!(componentState as RuntimeSwitchComponent)?.runtime ? Colors.iris : Colors.gray}
          size='20'
        />
        <span className='ml-2'>Constructor</span>
      </button>
    </div>
  );
};
