import { useContext } from "react";
import { DebugContext } from "../config/debugContext";

export const useDebug = () => {
  const { debug, setDebug } = useContext(DebugContext);

  const toggleDebug = () => {
    (window as any).debug = !debug; // eslint-disable-line @typescript-eslint/no-explicit-any
    setDebug?.(!debug);
  };

  return { debug, toggleDebug };
};
