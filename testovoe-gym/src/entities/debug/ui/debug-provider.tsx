import { useEffect, useMemo, useState } from "react";
import { DebugContext } from "../config";

/* eslint @typescript-eslint/no-explicit-any: 0 */

(window as any).debug = import.meta.env.DEV;

export const DebugProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [debugInternal, setDebugInternal] = useState<boolean>((window as any).debug);

  // просто не было идеи как спрятать debug режим :)
  useEffect(() => {
    const interval = setInterval(() => {
      if ((window as any).debug !== debugInternal) setDebugInternal((window as any).debug);
    }, 1000);

    return () => clearInterval(interval);
  }, [debugInternal]);

  const value = useMemo(() => ({ debug: debugInternal, setDebug: setDebugInternal }), [debugInternal]);

  return <DebugContext.Provider value={value}>{children}</DebugContext.Provider>;
};
