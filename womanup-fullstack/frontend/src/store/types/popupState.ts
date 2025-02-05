import { PayloadAction } from "@reduxjs/toolkit";

export type PopupContent = {
  uuid: string;
  message: string;
};

export type PopupState = {
  popups: PopupContent[];
};

export type AddPopupSagaAction = PayloadAction<{ message: string }>;
export type AddPopupReducerAction = PayloadAction<{ message: string; uuid: string }>;

export type DeletePopupAction = PayloadAction<{ uuid: string }>;
