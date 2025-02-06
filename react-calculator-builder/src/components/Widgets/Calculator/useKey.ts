import { useCallback, useEffect } from "react";
import { Canvas } from "types/Canvas";

export const useKey = (symbols: string[], cb: (key: string) => any, canvas: Canvas | undefined, runtime: boolean) => {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (symbols.includes(e.key)) {
        cb(e.key);
      }
    },
    [symbols, cb]
  );

  useEffect(() => {
    if (!runtime) return;
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [canvas, runtime, handleKey]);
};
