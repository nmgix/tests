import React from "react";
import { CanvasComponents, CanvasComponentsKeyArray } from "types/Canvas";
import RuntimeSwitch from "../RuntimeSwitch";
import { useCanvas } from "./useCanvas";

type CanvasProps = {
  noRuntime?: true;
  existingComponents?: CanvasComponentsKeyArray;
};

export const Canvas: React.FC<CanvasProps> = ({ noRuntime, existingComponents }) => {
  const { canvasState } = useCanvas(existingComponents);

  return (
    <div>
      {!noRuntime && <RuntimeSwitch canvasId={canvasState.id} componentId={""} />}
      {canvasState.components.map((component) =>
        React.createElement(CanvasComponents[component.type as keyof typeof CanvasComponents], {
          canvasId: canvasState.id,
          componentId: component.id,
        })
      )}
    </div>
  );
};
