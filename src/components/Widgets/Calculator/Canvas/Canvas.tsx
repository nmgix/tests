import classNames from "classnames";
import Icon from "components/Widgets/Calculator/Icon";
import React from "react";
import { CanvasComponentsObject, CanvasExistingComponent } from "types/Canvas/Canvas.components";
import { DragCanvasWidget } from "../DragCanvasWidget/DragCanvasWidget";
import { useCanvas } from "./useCanvas";

type CanvasProps = {
  noRuntime?: true;
  existingComponents?: CanvasExistingComponent[];
  componentsShadow?: true;
};

const requiredElements: (keyof typeof CanvasComponentsObject)[] = ["runtimeSwitch", "storage"];

const Dropzone: React.FC<{ isOver: boolean }> = ({ isOver }) => {
  return (
    <div
      className={classNames(
        "border-dashed border-2 border-outline-100 h-full flex items-center justify-center rounded-md",
        isOver ? "bg-sky-50" : "bg-white"
      )}>
      <div className='flex flex-col items-center'>
        <Icon name='landscape' stroke='black' size='20px' externalClassnames='mb-3' />
        <div className='font-medium text-center flex items-center flex-col'>
          <h4 className='text-iris-100 text-sm mb-1'>Перетащите сюда</h4>
          <span className='text-outline-300 text-xs w-[55%]'>любой элемент из левой панели</span>
        </div>
      </div>
    </div>
  );
};

const DropzoneLine: React.FC = () => (
  <div
    className={classNames(
      "w-full border-iris-100 border-b border-t relative",
      "after:w-[4px] after:h-[4px] after:bg-iris-100 after:content-[''] after:absolute after:rotate-45 after:translate-x-1/2 after:-translate-y-1/2 after:right-0",
      "before:w-[4px] before:h-[4px] before:bg-iris-100 before:content-[''] before:absolute before:rotate-45 before:-translate-x-1/2 before:-translate-y-1/2"
    )}
  />
);

export const Canvas: React.FC<CanvasProps> = ({ existingComponents, componentsShadow }) => {
  const {
    canvasState,
    runtime,
    dnd: { drop, isOver, drawLine },
  } = useCanvas(existingComponents);

  return (
    <div ref={drop} className='flex flex-col w-[240px] h-full'>
      {canvasState.components
        .filter((c) => requiredElements.includes(c.type as keyof typeof CanvasComponentsObject))
        .map((component, index) => (
          <DragCanvasWidget
            key={component.id}
            child={component}
            canvasId={canvasState.id}
            componentsShadow={componentsShadow ?? false}
            index={index}
            {...component}
          />
        ))}
      <div className='h-full spaced-y-12'>
        {canvasState.components.filter((c) => !["runtimeSwitch", "storage"].includes(c.type)).length === 0 &&
        !runtime ? (
          <Dropzone isOver={isOver} />
        ) : (
          <>
            {canvasState.components
              .filter((c) => !requiredElements.includes(c.type as keyof typeof CanvasComponentsObject))
              .map((component, index) => (
                <DragCanvasWidget
                  key={component.id}
                  child={component}
                  canvasId={canvasState.id}
                  componentsShadow={componentsShadow ?? false}
                  index={index}
                  {...component}
                />
              ))}
            {drawLine.active && <DropzoneLine />}
          </>
        )}
      </div>
    </div>
  );
};
