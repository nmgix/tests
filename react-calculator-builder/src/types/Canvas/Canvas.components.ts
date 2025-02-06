import DigitalBlock from "components/Widgets/Calculator/DigitalBlock";
import Display from "components/Widgets/Calculator/Display";
import EqualizationButton from "components/Widgets/Calculator/EqualizationButton";
import OperationButtons from "components/Widgets/Calculator/OperationButtons";
import RuntimeSwitch from "components/Widgets/Calculator/RuntimeSwitch";
import { v4 as uuid } from "uuid";
import StorageBlock from "components/Widgets/Calculator/StorageBlock";
import { StorageValues } from "types/Storage";
import { useCanvasWidget } from "components/Widgets/Calculator/useCanvasWidget";

/**
 * Основной класс - родитель всех элементов канвы
 */
export class CanvasComponent {
  id: string;
  indestructible: boolean;

  constructor(
    public type: string,
    public draggable: boolean,
    public undraggableInConstructor?: boolean,
    public preferableIndex?: number,
    indestructible?: boolean,
    existingId?: string
  ) {
    this.id = existingId ?? uuid();
    this.indestructible = indestructible !== undefined;
  }
}

// начало перечисления классов компонентов канвы
export class StorageComponent extends CanvasComponent {
  constructor(
    type: string,
    draggable: boolean,
    undraggableInConstructor?: boolean,
    preferableIndex?: number,
    indestructible?: boolean,
    existingId?: string
  ) {
    super("storage", draggable, undraggableInConstructor, preferableIndex, indestructible, existingId);
  }
  storedValue: string = StorageValues.empty;
}
export class RuntimeSwitchComponent extends CanvasComponent {
  constructor(
    type: string,
    draggable: boolean,
    undraggableInConstructor?: boolean,
    preferableIndex?: number,
    indestructible?: boolean,
    existingId?: string
  ) {
    super("runtimeSwitch", draggable, undraggableInConstructor, preferableIndex, indestructible, existingId);
  }
  runtime: boolean = false;
}
export class DisplayComponent extends CanvasComponent {
  constructor(
    type: string,
    draggable: boolean,
    undraggableInConstructor?: boolean,
    preferableIndex?: number,
    indestructible?: boolean,
    existingId?: string
  ) {
    super("display", draggable, true, 0, indestructible, existingId);
  }
}
// конец перечисления классов компонентов канвы

export const CanvasComponentsObject = {
  runtimeSwitch: {
    class: RuntimeSwitchComponent,
    component: RuntimeSwitch,
  },
  operationButtons: {
    class: CanvasComponent,
    component: OperationButtons,
  },
  equalizationButton: {
    class: CanvasComponent,
    component: EqualizationButton,
  },
  digitalBlock: {
    class: CanvasComponent,
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
  draggable: boolean;
  undraggableInConstructor?: boolean;
  indestructible?: boolean;
};

export type CanvasComponentProps = {
  canvasId: string;
  id: string;
  indestructible: boolean;
  componentsShadow: boolean;
  draggable: boolean;
  index: number;
};
export type DragCanvasWidgetProps = CanvasComponentProps &
  ReturnType<typeof useCanvasWidget> & {
    componentRef: React.RefObject<HTMLDivElement>;
  };

export type Operations = {
  operation: string;
  symbol: string;
  [x: string]: any;
}[];
