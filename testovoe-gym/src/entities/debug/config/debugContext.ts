import { createContext } from "react";
import { IDebugContext } from "./types";

export const DebugContext = createContext<IDebugContext>({});
