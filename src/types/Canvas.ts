import { v4 as uuid } from "uuid";
import Display from "components/Widgets/Calculator/Display";
import OperationButtons from "components/Widgets/Calculator/OperationButtons";
import DigitalBlock from "components/Widgets/Calculator/DigitalBlock";
import EqualizationButton from "components/Widgets/Calculator/EqualizationButton";
import RuntimeSwitch from "components/Widgets/Calculator/RuntimeSwitch";

// приемущество такого подхода можно увидеть в Canvas.tsx,
// если считать что все элементы принимают одни и те же пропсы (CanvasComponentProps),
// то сюда можно добавлять новые компоненты, а их логику в работе с канвасом прописывать отдельно
export const CanvasComponents = {
  display: Display,
  operationButtons: OperationButtons,
  digitalBlock: DigitalBlock,
  equalizationButton: EqualizationButton,
  runtimeSwitch: RuntimeSwitch,
};

export class Canvas {
  id: string = uuid();
  runtime: boolean = false;
  components: CanvasComponent[];

  constructor(existingComponents?: CanvasExistingComponent[]) {
    this.components = existingComponents
      ? existingComponents.map((existingComponent) => ({
          ...new CanvasComponent(existingComponent.component, existingComponent.indestructible),
        }))
      : [];
  }
}

export type CanvasState = {
  canvases: Canvas[];
};

export type CanvasExistingComponent = {
  component: keyof typeof CanvasComponents;
  indestructible?: boolean;
};

export type CanvasComponentProps = { canvasId: string; componentId: string; indestructible: boolean };

export class CanvasComponent {
  id: string = uuid();
  indestructible: boolean;

  constructor(public type: keyof typeof CanvasComponents, indestructible?: boolean) {
    this.indestructible = indestructible !== undefined;
  }
}
