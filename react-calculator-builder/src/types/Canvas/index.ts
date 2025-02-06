import { v4 as uuid } from "uuid";
import { CanvasComponent, CanvasComponentsObject, CanvasExistingComponent } from "./Canvas.components";

export function sortCanvasComponents(a: CanvasComponent, b: CanvasComponent) {
  if (a.preferableIndex !== undefined && b.preferableIndex !== undefined) {
    return a.preferableIndex > b.preferableIndex ? 1 : -1;
  } else if (a.preferableIndex !== undefined && !b.preferableIndex) {
    return -1;
  } else if (b.preferableIndex !== undefined && !a.preferableIndex) {
    return 1;
  } else {
    return 1;
  }
}

export class Canvas {
  id: string = uuid();
  components: CanvasComponent[];

  constructor(public maxItemsIndex: number, existingComponents?: CanvasExistingComponent[]) {
    let instancesArray: CanvasComponent[] = [];
    existingComponents?.forEach((existingComponent) => {
      const neededClass =
        CanvasComponentsObject[existingComponent.component as keyof typeof CanvasComponentsObject].class;
      const classInstance = new neededClass(
        existingComponent.component,
        existingComponent.draggable,
        existingComponent.undraggableInConstructor,
        undefined,
        existingComponent.indestructible
      );
      instancesArray.push({ ...classInstance } as CanvasComponent);
    });
    this.components = instancesArray.sort(sortCanvasComponents);
  }
}

export type CanvasProps = {
  maxItemsIndex: number;
  existingComponents?: CanvasExistingComponent[];
  componentsShadow?: true;
};

export type CanvasState = {
  canvases: Canvas[];
};
