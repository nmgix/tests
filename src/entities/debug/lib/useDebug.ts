import { useContext } from "react";
import { DebugContext } from "../config/debugContext";

export const useDebug = () => {
  const { debug, setDebug } = useContext(DebugContext);

  const toggleDebug = () => {
    setDebug?.(!debug);
  };

  return { debug, toggleDebug };
};
