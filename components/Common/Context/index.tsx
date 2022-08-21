import React, { createContext, useContext, useState } from "react";
import Router from "next/router";
import { Metrics, MetricsKey } from "../../../helpers/metrics";

type Order = string;

type ContextProps = {
  order: Order[];
  addAsteroid: (id: string) => void;
  removeAsteroid: (id: string) => void;
  confirmOrder: () => void;

  selecetedMetric: MetricsKey;
  changeMetric: (metric: MetricsKey) => void;

  showHazardous: boolean;
  changeShowHazardous: () => void;
};

const Context = createContext<ContextProps>({
  order: [],
  addAsteroid: () => console.log("Function didn't load"),
  removeAsteroid: () => console.log("Function didn't load"),
  confirmOrder: () => console.log("Function didn't load"),

  selecetedMetric: "kiloMeters",
  changeMetric: () => console.log("Function didn't load"),

  showHazardous: false,
  changeShowHazardous: () => console.log("Function didn't load"),
});

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [order, setOrder] = useState<Order[]>([]);
  function addAsteroid(id: string) {
    setOrder((prev) => {
      let set = new Set(prev);
      set.add(id);
      return [...Array.from(set)];
    });
  }
  function removeAsteroid(id: string) {
    setOrder((prev) => {
      let set = new Set(prev);
      set.delete(id);
      return [...Array.from(set)];
    });
  }
  function confirmOrder() {
    Router.push("/");
    setOrder((prev) => {
      return {
        ...prev,
        order: [],
      };
    });
  }

  const [selecetedMetric, setSelectedMetric] = useState<MetricsKey>("kiloMeters");
  function changeMetric(metric: MetricsKey) {
    setSelectedMetric(metric);
  }

  const [showHazardous, setShowHazardous] = useState<boolean>(false);
  function changeShowHazardous() {
    setShowHazardous((prev) => !prev);
  }

  return (
    <Context.Provider
      value={{
        order,
        addAsteroid,
        confirmOrder,
        removeAsteroid,

        selecetedMetric,
        changeMetric,

        showHazardous,
        changeShowHazardous,
      }}>
      {children}
    </Context.Provider>
  );
};

export function useAsteroidContext() {
  return useContext(Context);
}
