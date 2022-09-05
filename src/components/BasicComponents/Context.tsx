import React, { useContext } from "react";
import { useState } from "react";

type AppContextProps = {
  authed: boolean;
  changeAuthState: (authed: boolean) => void;
};

const Context = React.createContext<AppContextProps>({} as AppContextProps);

export const ContextProvier: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authed, setAuthed] = useState<boolean>(false);

  function changeAuthState(authed: boolean) {
    setAuthed(authed);
  }

  return <Context.Provider value={{ authed, changeAuthState }}>{children}</Context.Provider>;
};

export function useAppContext() {
  return useContext(Context);
}
