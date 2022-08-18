import React, { createContext, useContext, useState } from "react";
import Router from "next/router";

type ContextProps = {
  order: number[];
  addAsteroid: (id: number) => void;
  removeAsteroid: (id: number) => void;
  confirmOrder: () => void;
};

const Context = createContext<ContextProps>({
  order: [],
  addAsteroid: () => console.log("Function didn't load"),
  removeAsteroid: () => console.log("Function didn't load"),
  confirmOrder: () => console.log("Function didn't load"),
});

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [asteroidContext, setAsteroidContext] = useState<ContextProps>({
    order: [],
    addAsteroid,
    removeAsteroid,
    confirmOrder,
  });

  function addAsteroid(id: number) {
    setAsteroidContext((prev) => {
      return {
        ...prev,
        order: [...prev.order, id],
      };
    });
  }

  function removeAsteroid(id: number) {
    setAsteroidContext((prev) => {
      return {
        ...prev,
        order: prev.order.filter((asteroidID) => asteroidID !== id),
      };
    });
  }

  function confirmOrder() {
    Router.push("/");
    setAsteroidContext((prev) => {
      return {
        ...prev,
        order: [],
      };
    });
  }

  return <Context.Provider value={asteroidContext}>{children}</Context.Provider>;
};

export function useAsteroidContext() {
  return useContext(Context);
}
