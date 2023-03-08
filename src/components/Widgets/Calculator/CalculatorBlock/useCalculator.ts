import { useState } from "react";
import { useAppSelector } from "redux/helpers";
import { useCanvas } from "../useCanvasWidget";

export const useCalculator = (canvasId: string) => {
  const [evalData, setEvalData] = useState<string>("");
  const [perform, setPerform] = useState<boolean>(true); //или что скорее всего, redux
  const state = useAppSelector((state) => state.canvas);
  const canvas = useCanvas(state, canvasId);

  return {
    evalData,
  };
};
