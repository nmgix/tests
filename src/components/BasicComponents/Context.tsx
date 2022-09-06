import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Filters, retrieveLinks } from "../../networkRequests";
import { LinkData } from "../PageComponents/User/Content";

import structuredClone from "@ungap/structured-clone";
import { concatLinks } from "../../helpers/arrays";

enum ModalPresets {
  "new-link",
  "filters",
}

type LinkListStateProps = {
  offset: number;
  limit: number;
};

export type AllModalPresets = keyof typeof ModalPresets;

type AppContextProps = {
  authed: boolean;
  changeAuthState: (authed: boolean) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;

  modalActive: boolean;
  setModalState: (active: boolean) => void;

  modalType: AllModalPresets | null;
  setModalType: (modelType: AllModalPresets | null) => void;

  filterActive: boolean;
  setFilterActive: () => void;

  filterData: Filters;
  setFilterData: (filter: keyof Filters, value: boolean | null) => void;

  linkList: LinkData[] | null;
  pushLinks: (links: LinkData[]) => void;

  linkListStateData: LinkListStateProps;
  setLinkListStateData: React.Dispatch<React.SetStateAction<LinkListStateProps>>;
};

const Context = React.createContext<AppContextProps>({} as AppContextProps);

export const ContextProvier: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authed, setAuthed] = useState<boolean>(false);
  function changeAuthState(authed: boolean) {
    setAuthed(authed);
  }

  const [loading, setLoading] = useState<boolean>(true);
  function changeLoading(loading: boolean) {
    setLoading(loading);
  }

  const [modalType, setModalType] = useState<AllModalPresets | null>(null);
  function changeModalType(model: AllModalPresets | null) {
    setModalType(model);
  }
  //
  const [modalActive, setModalActive] = useState<boolean>(false);
  function setModalState(active: boolean) {
    setModalActive(active);
  }
  //
  const [filterActive, setFilterActive] = useState<boolean>(false);
  function changeFilterActive() {
    setFilterActive((prev) => !prev);
  }
  const [filterData, setFilterData] = useState<Filters>({ short: null, counter: null, target: null });
  function changeFilterData(filter: keyof Filters, value: boolean | null) {
    setFilterData((prev) => {
      return {
        ...prev,
        [filter]: value,
      };
    });
  }

  const [linkListStateData, setLinkListStateData] = useState<LinkListStateProps>({
    limit: Number(process.env.REACT_APP_LINKS_PER_LIST!),
    offset: 0,
  });
  const [linkList, setLinkList] = useState<LinkData[] | null>(null);
  //
  const requestLinks: (filters: Filters, offsetData: LinkListStateProps) => Promise<LinkData[] | null> = async (
    filters
  ) => {
    let response = await retrieveLinks({
      offset: linkListStateData.offset,
      limit: linkListStateData.limit + 1,
      filters: filters,
    });
    return response;
  };

  const requestNextLinks = (filters: Filters, offsetData: LinkListStateProps) => {
    setLoading(true);
    requestLinks(filters, offsetData).then((data) => {
      setLinkList(data);
      setLoading(false);
    });
  };
  //
  const pushLinks = (links: LinkData[]) => {
    setLinkList((prev) => concatLinks(prev, links));
    requestNextLinks(filterData, {
      limit: linkListStateData.limit,
      offset: linkListStateData.offset + (Number(process.env.REACT_APP_LINKS_PER_LIST!) + 1),
    });
  };

  useEffect(() => {
    if (authed) {
      requestNextLinks(filterData, linkListStateData);
    }
  }, [linkListStateData.offset, authed]);
  //

  useEffect(() => {
    if (authed) {
      if (filterActive) {
        setLinkListStateData((prev) => {
          return { ...prev, offset: 0 };
        });
        requestNextLinks(filterData, { limit: linkListStateData.limit + 1, offset: 0 });
      }
    }
  }, [filterActive, filterData]);
  //
  useEffect(() => {
    if (modalType !== null) {
      setModalState(true);
    }
  }, [modalType]);
  //
  useEffect(() => {
    setModalType(null);
  }, [modalActive]);

  return (
    <Context.Provider
      value={{
        authed,
        changeAuthState,
        modalActive,
        setModalState,
        modalType,
        setModalType: changeModalType,
        filterActive,
        setFilterActive: changeFilterActive,
        filterData,
        setFilterData: changeFilterData,
        linkList,
        pushLinks,
        linkListStateData,
        setLinkListStateData,
        loading,
        setLoading: changeLoading,
      }}>
      {children}
    </Context.Provider>
  );
};

export function useAppContext() {
  return useContext(Context);
}
