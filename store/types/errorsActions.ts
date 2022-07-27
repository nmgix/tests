import { TodoElementProps } from "@/components/Todo/TodoElement/TodoElement";
import { Action, PayloadAction } from "@reduxjs/toolkit";
import { CustomError } from "../reducers/errorsSlice";

export type CreateErrorAction = PayloadAction<CustomError>;
export type DeleteErrorAction = PayloadAction<{ uuid: string }>;
