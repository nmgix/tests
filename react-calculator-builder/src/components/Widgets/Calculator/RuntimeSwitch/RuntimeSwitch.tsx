import classNames from "classnames";
import Icon from "components/Widgets/Calculator/Icon";
import { DragCanvasWidgetProps, RuntimeSwitchComponent } from "types/Canvas/Canvas.components";
import { Colors } from "types/Colors";
import { useRuntimeSwitch } from "./useRuntimeSwitch";

export const RuntimeSwitch: React.FC<DragCanvasWidgetProps> = ({
  canvas,
  componentState,
  dnd: { drag },
  componentRef,
}) => {
  const { switchFunc } = useRuntimeSwitch(canvas, componentState as RuntimeSwitchComponent);

  return (
    <div ref={drag}>
      <div
        ref={componentRef}
        className='rounded-md bg-gray-100 flex p-px text-font-alter font-medium text-sm mb-[30px]'>
        <button
          onClick={() => switchFunc(true)}
          className={classNames(
            "flex rounded-md items-center py-2 px-3",
            (componentState as RuntimeSwitchComponent)?.runtime && "bg-white border-solid border-outline-200"
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
            !(componentState as RuntimeSwitchComponent)?.runtime && "bg-white border-solid border-outline-200"
          )}>
          <Icon
            name='selector'
            stroke={!(componentState as RuntimeSwitchComponent)?.runtime ? Colors.iris : Colors.gray}
            size='20'
          />
          <span className='ml-2'>Constructor</span>
        </button>
      </div>
    </div>
  );
};
