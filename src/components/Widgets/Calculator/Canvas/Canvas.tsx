import React from "react";
import { CanvasComponents, CanvasExistingComponent } from "types/Canvas";
import RuntimeSwitch from "../RuntimeSwitch";
import { useCanvas } from "./useCanvas";

type CanvasProps = {
  noRuntime?: true;
  existingComponents?: CanvasExistingComponent[];
};

export const Canvas: React.FC<CanvasProps> = ({ noRuntime, existingComponents }) => {
  const { canvasState } = useCanvas(existingComponents);
  return (
    <div>
      {!noRuntime && <RuntimeSwitch canvasId={canvasState.id} componentId={""} indestructible={true} />}
      {canvasState.components.map((component) =>
        React.createElement(CanvasComponents[component.type as keyof typeof CanvasComponents], {
          canvasId: canvasState.id,
          componentId: component.id,
          indestructible: component.indestructible,
          key: component.id,
        })
      )}
    </div>
  );
};
