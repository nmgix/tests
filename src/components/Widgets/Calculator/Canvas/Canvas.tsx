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

const Dropzone: React.FC = () => {
  return (
    <div className='border-dashed border-2 border-outline-100 h-full flex items-center justify-center rounded-md'>
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

export const Canvas: React.FC<CanvasProps> = ({ existingComponents, componentsShadow }) => {
  const { canvasState, runtime } = useCanvas(existingComponents);
  return (
    <div className='h-full flex flex-col w-[240px]'>
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
          <Dropzone />
        ) : (
          canvasState.components
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
            ))
        )}
      </div>
    </div>
  );
};
