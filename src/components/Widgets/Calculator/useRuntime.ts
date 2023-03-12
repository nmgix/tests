import { useEffect, useState } from "react";
import { Canvas } from "types/Canvas";
import { RuntimeSwitchComponent } from "types/Canvas/Canvas.components";

export const useRuntime = (canvas: Canvas | undefined) => {
  const [currentRuntime, setCurrentRuntime] = useState<RuntimeSwitchComponent | undefined>();

  useEffect(() => {
    setCurrentRuntime(canvas?.components.find((c) => c.type === "runtimeSwitch") as RuntimeSwitchComponent);
  }, [canvas]);

  return {
    runtimeExists: currentRuntime !== undefined,
    runtime: currentRuntime?.runtime ?? false,
  };
};
