import { Icon } from "components/Icon";
import React from "react";
import { Canvas as CanvasState } from "types/Canvas";
import { CanvasComponents, CanvasComponentsObject, CanvasExistingComponent } from "types/Canvas/Canvas.components";
import { useCanvas } from "./useCanvas";

type CanvasProps = {
  noRuntime?: true;
  existingComponents?: CanvasExistingComponent[];
};

const requiredElements: (keyof typeof CanvasComponentsObject)[] = ["runtimeSwitch", "storage"];
const createComponent = (component: CanvasComponents, canvasState: CanvasState) => {
  const neededComponent = CanvasComponentsObject[component.type as keyof typeof CanvasComponentsObject];

  return React.createElement(neededComponent.component, {
    canvasId: canvasState.id,
    componentId: component.id,
    indestructible: component.indestructible,
    key: component.id,
  });
};

export const Canvas: React.FC<CanvasProps> = ({ noRuntime, existingComponents }) => {
  const { canvasState, runtime } = useCanvas(existingComponents);
  return (
    <div className='h-full flex flex-col min-w-[240px]'>
      {canvasState.components
        .filter((c) => requiredElements.includes(c.type as keyof typeof CanvasComponentsObject))
        .map((component) => createComponent(component, canvasState))}
      <div className='h-full spaced-y-16'>
        {canvasState.components.filter((c) => !["runtimeSwitch", "storage"].includes(c.type)).length === 0 &&
        !runtime ? (
          <div className='border-dashed border-2 border-outline-100 h-full flex items-center justify-center rounded-md'>
            <div className='flex flex-col items-center'>
              <Icon name='landscape' stroke='black' size='20px' externalClassnames='mb-3' />
              <div className='font-medium text-center flex items-center flex-col'>
                <h4 className='text-iris-100 text-sm mb-1'>Перетащите сюда</h4>
                <span className='text-outline-300 text-xs w-[55%]'>любой элемент из левой панели</span>
              </div>
            </div>
          </div>
        ) : (
          canvasState.components
            .filter((c) => !requiredElements.includes(c.type as keyof typeof CanvasComponentsObject))
            .map((component) => createComponent(component, canvasState))
        )}
      </div>
    </div>
  );
};
