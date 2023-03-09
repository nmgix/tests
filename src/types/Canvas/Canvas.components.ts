import DigitalBlock from "components/Widgets/Calculator/DigitalBlock";
import Display from "components/Widgets/Calculator/Display";
import EqualizationButton from "components/Widgets/Calculator/EqualizationButton";
import OperationButtons from "components/Widgets/Calculator/OperationButtons";
import RuntimeSwitch from "components/Widgets/Calculator/RuntimeSwitch";
import { v4 as uuid } from "uuid";
import StorageBlock from "components/Widgets/Calculator/StorageBlock";
import { StorageValues } from "types/Storage";

/**
 * Основной класс - родитель всех элементов канвы
 */
export class CanvasComponent {
  id: string;
  indestructible: boolean;

  constructor(public type: string, indestructible?: boolean, existingId?: string) {
    this.id = existingId ?? uuid();
    this.indestructible = indestructible !== undefined;
  }
}

// начало перечисления классов компонентов канвы
export class StorageComponent extends CanvasComponent {
  constructor(indestructible?: boolean, existingId?: string) {
    super("storage", indestructible, existingId);
  }
  storedValue: string = StorageValues.empty;
}
export class DisplayComponent extends CanvasComponent {
  constructor(indestructible?: boolean, existingId?: string) {
    super("display", indestructible, existingId);
  }
}
export class DigitalBlockComponent extends CanvasComponent {
  constructor(indestructible?: boolean, existingId?: string) {
    super("digitalBlock", indestructible, existingId);
  }
}
export class EqualizationButtonComponent extends CanvasComponent {
  constructor(indestructible?: boolean, existingId?: string) {
    super("equalizationButton", indestructible, existingId);
  }
}
export class OperationButtonsComponent extends CanvasComponent {
  constructor(indestructible?: boolean, existingId?: string) {
    super("operationButtons", indestructible, existingId);
  }
}
export class RuntimeSwitchComponent extends CanvasComponent {
  constructor(indestructible?: boolean, existingId?: string) {
    super("runtimeSwitch", indestructible, existingId);
  }
  runtime: boolean = false;
}
// конец перечисления классов компонентов канвы

export type CanvasComponents =
  | StorageComponent
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
  storage: {
    class: StorageComponent,
    component: StorageBlock,
  },
};

export type CanvasExistingComponent = {
  component: keyof typeof CanvasComponentsObject;
  indestructible?: boolean;
};
export type CanvasComponentsArrayType = CanvasComponents[];
export type CanvasComponentProps = { canvasId: string; componentId: string; indestructible: boolean };
