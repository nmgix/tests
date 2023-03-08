import { v4 as uuid } from "uuid";
import Display from "components/Widgets/Calculator/Display";
import OperationButtons from "components/Widgets/Calculator/OperationButtons";
import DigitalBlock from "components/Widgets/Calculator/DigitalBlock";
import EqualizationButton from "components/Widgets/Calculator/EqualizationButton";
import RuntimeSwitch from "components/Widgets/Calculator/RuntimeSwitch";
import CalculatorBlock from "components/Widgets/Calculator/CalculatorBlock";

// приемущество такого подхода можно увидеть в Canvas.tsx,
// если считать что все элементы принимают одни и те же пропсы (CanvasComponentProps),
// то сюда можно добавлять новые компоненты, а их логику в работе с канвасом прописывать отдельно

export class Canvas {
  id: string = uuid();
  components: CanvasComponentsArray;

  constructor(existingComponents?: CanvasExistingComponent[]) {
    let instancesArray: CanvasComponentsSelector.CanvasComponents[] = [];
    existingComponents?.forEach((existingComponent) => {
      const neededClass = CanvasComponentsSelector.getSuitableClass(existingComponent.component);

      // @ts-ignore
      const classInstance = new neededClass(existingComponent.indestructible);
      // const neededInstance = { ...classInstance } as Partial<CanvasComponentsSelector.CanvasComponents>;
      // delete neededInstance.component;
      // instancesArray.push({ ...neededInstance } as CanvasComponentsSelector.CanvasComponents);
      instancesArray.push({ ...classInstance } as CanvasComponentsSelector.CanvasComponents);
    });
    this.components = instancesArray;
  }
}

export type CanvasState = {
  canvases: Canvas[];
};

export type CanvasExistingComponent = {
  component: CanvasComponentsSelector.CanvasComponents["type"];
  indestructible?: boolean;
};

export type CanvasComponentProps = { canvasId: string; componentId: string; indestructible: boolean };

export class CanvasComponent {
  id: string;
  indestructible: boolean;
  dependantOn: CanvasComponentsSelector.CanvasComponents["type"][] = [];
  dependantBy: CanvasComponentsSelector.CanvasComponents["type"][] = [];

  constructor(public type: string, indestructible?: boolean, existingId?: string) {
    this.id = existingId ?? uuid();
    this.indestructible = indestructible !== undefined;
  }
}

export namespace CanvasComponentsSelector {
  export function getSuitableClass(type: string): CanvasComponents | undefined {
    let neededClass: CanvasComponents | undefined = undefined;

    Object.keys(this).some((name) => {
      const namespaceElement: CanvasComponents = this[name];

      if (namespaceElement.type === type) {
        neededClass = namespaceElement;
        return true;
      } else {
        return false;
      }
    });
    return neededClass;
  }

  export class CalculatorComponent extends CanvasComponent {
    constructor(indestructible?: boolean, existingId?: string) {
      super("calculator", indestructible, existingId);
      existingId && (this.id = existingId);
    }
    static type: string = "calculator";
    storedValue: string = "";
    component: React.FC<any> = CalculatorBlock;
    dependantOn: CanvasComponents["type"][] = [
      "operationButtons",
      "digitalBlock",
      "equalizationButton",
      "equalizationButton",
    ];
    dependantBy: CanvasComponents["type"][] = [];
  }
  export class DisplayComponent extends CanvasComponent {
    constructor(indestructible?: boolean, existingId?: string) {
      super("display", indestructible, existingId);
      existingId && (this.id = existingId);
    }
    static type = "display";
    component: React.FC<any> = Display;
    dependantOn: CanvasComponents["type"][] = ["calculator"];
    dependantBy: CanvasComponents["type"][] = [];
  }
  export class DigitalBlockComponent extends CanvasComponent {
    constructor(indestructible?: boolean, existingId?: string) {
      super("digitalBlock", indestructible, existingId);
      existingId && (this.id = existingId);
    }
    static type: string = "digitalBlock";
    component: React.FC<any> = DigitalBlock;
    dependantOn: CanvasComponents["type"][] = ["calculator"];
    dependantBy: CanvasComponents["type"][] = [];
  }
  export class EqualizationButtonComponent extends CanvasComponent {
    constructor(indestructible?: boolean, existingId?: string) {
      super("equalizationButton", indestructible, existingId);
      existingId && (this.id = existingId);
    }
    static type: string = "equalizationButton";
    component: React.FC<any> = EqualizationButton;
    dependantOn: CanvasComponents["type"][] = ["calculator"];
    dependantBy: CanvasComponents["type"][] = [];
  }
  export class OperationButtonsComponent extends CanvasComponent {
    constructor(indestructible?: boolean, existingId?: string) {
      super("operationButtons", indestructible, existingId);
      existingId && (this.id = existingId);
    }
    static type: string = "operationButtons";
    component: React.FC<any> = OperationButtons;
    dependantOn: CanvasComponents["type"][] = ["calculator"];
    dependantBy: CanvasComponents["type"][] = [];
  }
  export class RuntimeSwitchComponent extends CanvasComponent {
    constructor(indestructible?: boolean, existingId?: string) {
      super("runtimeSwitch", indestructible, existingId);
      existingId && (this.id = existingId);
    }
    static type: string = "runtimeSwitch";
    component: React.FC<any> = RuntimeSwitch;
    dependantOn: CanvasComponents["type"][] = ["calculator"];
    dependantBy: CanvasComponents["type"][] = [];
    runtime: boolean = false;
  }
  export type CanvasComponents =
    | CalculatorComponent
    | DisplayComponent
    | DigitalBlockComponent
    | EqualizationButtonComponent
    | OperationButtonsComponent
    | RuntimeSwitchComponent;
}

// const idk = {
//   calculator: CanvasComponentsSelector.CalculatorComponent
// }

export type CanvasComponentsArray = CanvasComponentsSelector.CanvasComponents[];
