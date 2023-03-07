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

  constructor(existingComponents?: CanvasComponentsKeyArray) {
    this.components = existingComponents ? existingComponents.map((component) => new CanvasComponent(component)) : [];
  }
}

export type CanvasState = {
  canvases: Canvas[];
};

export type CanvasComponentsKeyArray = (keyof typeof CanvasComponents)[];

export type CanvasComponentProps = { canvasId: string; componentId: string };

export class CanvasComponent {
  id: string = uuid();

  constructor(public type: keyof typeof CanvasComponents) {}
}
