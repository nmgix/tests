import { CartItem } from "../components/Cart/Cart";
import { DefaultState } from "./Context";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Actions {
  LoadState = "LOAD_STATE",
  BuyCart = "BUY_CART",
  ItemAdd = "ITEM_ADD",
  ItemDelete = "ITEM_DELETE",
  ClearError = "CLEAR_ERROR",
}

type CartPayload = {
  [Actions.LoadState]: DefaultState;
  [Actions.ClearError]: undefined; //пока что undefined, потом можно сделать массив с текстом и uuid, а не только локально в корзине
  [Actions.BuyCart]: undefined;
  [Actions.ItemAdd]: CartItem;
  [Actions.ItemDelete]: {
    id: string;
  };
};

export type CartActions = ActionMap<CartPayload>[keyof ActionMap<CartPayload>];

const Reducer = (state: DefaultState, action: CartActions) => {
  switch (action.type) {
    case Actions.LoadState: {
      return action.payload;
    }
    case Actions.BuyCart: {
      var totalSum = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
      if (state.balance >= totalSum) {
        return {
          ...state,
          balance: state.balance - totalSum,
          items: [],
        };
      } else {
        return {
          ...state,
          error: "Недостаточно денег для заказа",
        };
      }
    }
    case Actions.ItemAdd: {
      var item = state.items.find((item) => item.id === action.payload.id);
      if (!item) {
        return {
          ...state,
          items: [...state.items, action.payload],
          error: null,
        };
      } else {
        var resultItems = state.items.map((element) =>
          element.id === action.payload.id ? { ...element, count: element.count + 1 } : element
        );
        return {
          ...state,
          items: resultItems,
          error: null,
        };
      }
    }
    case Actions.ItemDelete: {
      var currentItem = state.items.find((item) => item.id === action.payload.id);
      if (!currentItem) {
        return state;
      } else if (currentItem.count > 1) {
        var resultItems = state.items.map((element) =>
          element.id === action.payload.id ? { ...element, count: element.count - 1 } : element
        );
        return {
          ...state,
          items: resultItems,
          error: null,
        };
      } else {
        return {
          ...state,
          items: [...state.items.filter((item) => item.id !== action.payload.id)],
          error: null,
        };
      }
    }
    case Actions.ClearError: {
      return {
        ...state,
        error: null,
      };
    }

    default:
      return state;
  }
};

export default Reducer;
