import { createSlice } from "@reduxjs/toolkit";
import { AddPopupReducerAction, DeletePopupAction, PopupState, AddPopupSagaAction } from "../types/popupState";

const initialState: PopupState = {
  popups: [],
};

export const popupControllerSlice = createSlice({
  name: "popupControl",
  initialState,
  reducers: {
    initAddNewPopup(state, action: AddPopupSagaAction) {},
    addNewPopup(state, action: AddPopupReducerAction) {
      return {
        ...state,
        popups: [...state.popups, action.payload],
      };
    },
    deleteExistingPopup(state, action: DeletePopupAction) {
      return {
        ...state,
        popups: state.popups.filter((popup) => popup.uuid !== action.payload.uuid),
      };
    },
  },
});

export const { initAddNewPopup, addNewPopup, deleteExistingPopup } = popupControllerSlice.actions;

export default popupControllerSlice.reducer;
