import CalculatorBlock from "components/Widgets/Calculator/CalculatorBlock";
import DigitalBlock from "components/Widgets/Calculator/DigitalBlock";
import Display from "components/Widgets/Calculator/Display";
import EqualizationButton from "components/Widgets/Calculator/EqualizationButton";
import OperationButtons from "components/Widgets/Calculator/OperationButtons";
import RuntimeSwitch from "components/Widgets/Calculator/RuntimeSwitch";
import { v4 as uuid } from "uuid";

/**
 * Основной класс - родитель всех элементов канвы
 */
export class CanvasComponent {
  id: string;
  indestructible: boolean;
  dependantOn: CanvasComponents["type"][] = [];
  dependantBy: CanvasComponents["type"][] = [];

  constructor(public type: string, indestructible?: boolean, existingId?: string) {
    this.id = existingId ?? uuid();
    this.indestructible = indestructible !== undefined;
  }
}

// начало перечисления классов компонентов канвы
export class CalculatorComponent extends CanvasComponent {
  constructor(indestructible?: boolean, existingId?: string) {
    super("calculator", indestructible, existingId);
    existingId && (this.id = existingId);
  }
  dependantOn: CanvasComponents["type"][] = [
    "operationButtons",
    "digitalBlock",
    "equalizationButton",
    "equalizationButton",
  ];
  dependantBy: CanvasComponents["type"][] = [];
  storedValue: string = "";
}
export class DisplayComponent extends CanvasComponent {
  constructor(indestructible?: boolean, existingId?: string) {
    super("display", indestructible, existingId);
    existingId && (this.id = existingId);
  }
  dependantOn: CanvasComponents["type"][] = ["calculator"];
  dependantBy: CanvasComponents["type"][] = [];
}
export class DigitalBlockComponent extends CanvasComponent {
  constructor(indestructible?: boolean, existingId?: string) {
    super("digitalBlock", indestructible, existingId);
    existingId && (this.id = existingId);
  }
  dependantOn: CanvasComponents["type"][] = ["calculator"];
  dependantBy: CanvasComponents["type"][] = [];
}
export class EqualizationButtonComponent extends CanvasComponent {
  constructor(indestructible?: boolean, existingId?: string) {
    super("equalizationButton", indestructible, existingId);
    existingId && (this.id = existingId);
  }
  dependantOn: CanvasComponents["type"][] = ["calculator"];
  dependantBy: CanvasComponents["type"][] = [];
}
export class OperationButtonsComponent extends CanvasComponent {
  constructor(indestructible?: boolean, existingId?: string) {
    super("operationButtons", indestructible, existingId);
    existingId && (this.id = existingId);
  }
  dependantOn: CanvasComponents["type"][] = ["calculator"];
  dependantBy: CanvasComponents["type"][] = [];
}
export class RuntimeSwitchComponent extends CanvasComponent {
  constructor(indestructible?: boolean, existingId?: string) {
    super("runtimeSwitch", indestructible, existingId);
    existingId && (this.id = existingId);
  }
  dependantOn: CanvasComponents["type"][] = ["calculator"];
  dependantBy: CanvasComponents["type"][] = [];
  runtime: boolean = false;
}
// конец перечисления классов компонентов канвы

export type CanvasComponents =
  | CalculatorComponent
  | DisplayComponent
  | DigitalBlockComponent
  | EqualizationButtonComponent
  | OperationButtonsComponent
  | RuntimeSwitchComponent;

export const CanvasComponentsObject = {
  runtimeSwitch: {
    class: RuntimeSwitchComponent,
    component: RuntimeSwitch,
  },
  operationButtons: {
    class: OperationButtonsComponent,
    component: OperationButtons,
  },
  equalizationButton: {
    class: EqualizationButtonComponent,
    component: EqualizationButton,
  },
  digitalBlock: {
    class: DigitalBlockComponent,
    component: DigitalBlock,
  },
  display: {
    class: DisplayComponent,
    component: Display,
  },
  calculator: {
    class: CalculatorComponent,
    component: CalculatorBlock,
  },
};

export type CanvasExistingComponent = {
  component: CanvasComponents["type"];
  indestructible?: boolean;
};
export type CanvasComponentsArrayType = CanvasComponents[];
export type CanvasComponentProps = { canvasId: string; componentId: string; indestructible: boolean };
