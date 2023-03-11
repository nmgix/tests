import { v4 as uuid } from "uuid";
import { CanvasComponent, CanvasComponentsObject, CanvasExistingComponent } from "./Canvas.components";

export class Canvas {
  id: string = uuid();
  components: CanvasComponent[];

  constructor(existingComponents?: CanvasExistingComponent[]) {
    let instancesArray: CanvasComponent[] = [];
    existingComponents?.forEach((existingComponent) => {
      const neededClass =
        CanvasComponentsObject[existingComponent.component as keyof typeof CanvasComponentsObject].class;
      const classInstance = new neededClass(
        existingComponent.component,
        existingComponent.draggable,
        existingComponent.indestructible
      );
      instancesArray.push({ ...classInstance } as CanvasComponent);
    });
    this.components = instancesArray;
  }
}

export type CanvasState = {
  canvases: Canvas[];
};
