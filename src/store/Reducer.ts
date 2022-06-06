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
  BuyCart = "BUY_CART",
  ItemAdd = "ITEM_ADD",
  ItemDelete = "ITEM_DELETE",
}

type CartPayload = {
  [Actions.BuyCart]: undefined;
  [Actions.ItemAdd]: CartItem;
  [Actions.ItemDelete]: {
    id: string;
  };
};

export type CartActions = ActionMap<CartPayload>[keyof ActionMap<CartPayload>];

const Reducer = (state: DefaultState, action: CartActions) => {
  switch (action.type) {
    case Actions.BuyCart: {
      var totalSum = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
      if (state.balance >= totalSum) {
        return {
          ...state,
          balance: state.balance - totalSum,
          items: [],
        };
      } else {
        return state;
      }
    }
    case Actions.ItemAdd: {
      var item = state.items.find((item) => item.id === action.payload.id);
      if (!item) {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      } else {
        var resultItems = state.items.map((element) =>
          element.id === action.payload.id ? { ...element, count: element.count + 1 } : element
        );
        return {
          ...state,
          items: resultItems,
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
        };
      } else {
        return {
          ...state,
          items: [...state.items.filter((item) => item.id !== action.payload.id)],
        };
      }
    }

    default:
      return state;
  }
};

export default Reducer;
