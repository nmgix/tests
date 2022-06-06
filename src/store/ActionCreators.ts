import React from "react";
import { CartItem } from "../components/Cart/Cart";
import { DefaultState } from "./Context";
import { Actions, CartActions } from "./Reducer";

export const loadState = (dispatch: React.Dispatch<CartActions>) => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return dispatch(JSON.parse(serializedState));
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: DefaultState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    return undefined;
  }
};

export const BuyItems = (dispatch: React.Dispatch<CartActions>) => {
  dispatch({ type: Actions.BuyCart });
};

export const AddItem = (dispatch: React.Dispatch<CartActions>, item: CartItem) => {
  dispatch({ type: Actions.ItemAdd, payload: item });
};

export const DeleteItem = (dispatch: React.Dispatch<CartActions>, id: string) => {
  dispatch({
    type: Actions.ItemDelete,
    payload: {
      id,
    },
  });
};
