import { v4 as uuid } from "uuid";
import {
  CanvasComponents,
  CanvasComponentsArrayType,
  CanvasComponentsObject,
  CanvasExistingComponent,
} from "./Canvas.components";

export class Canvas {
  id: string = uuid();
  components: CanvasComponentsArrayType;

  constructor(existingComponents?: CanvasExistingComponent[]) {
    let instancesArray: CanvasComponents[] = [];
    existingComponents?.forEach((existingComponent) => {
      const neededClass =
        CanvasComponentsObject[existingComponent.component as keyof typeof CanvasComponentsObject].class;
      const classInstance = new neededClass(existingComponent.indestructible);
      instancesArray.push({ ...classInstance } as CanvasComponents);
    });
    this.components = instancesArray;
  }
}

export type CanvasState = {
  canvases: Canvas[];
};
