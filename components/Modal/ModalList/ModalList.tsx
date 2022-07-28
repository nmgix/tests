import { CreateTodo, Modal, ModalProps } from "../ModalElement/Modal";
import customStyles from "../ModalElement/createTodo.module.scss";
import styles from "./modalList.module.scss";
import React, { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

type IModalContext = {
  modals: ModalProps[];
  createModal: CreateModalFunc;
  destroyModal: DestroyModalFunc;
};
type CreateModalFunc = (args: Omit<ModalProps, "closeForm" | "uuid">) => void;
type DestroyModalFunc = (uuid: string) => void;

export const ModalContext = createContext<IModalContext>({ modals: [], createModal: () => {}, destroyModal: () => {} });

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const closeForm: DestroyModalFunc = (uuid: string) => {
    setModals((prevModals) => prevModals.filter((modal) => modal.uuid !== uuid));
  };

  const createModal: CreateModalFunc = (args) => {
    setModals([...modals, { ...args, closeForm, uuid: uuid() }]);
  };

  const [modals, setModals] = useState<ModalProps[]>([
    {
      closeForm: closeForm,
      title: "Add new todo",
      uuid: "UUID-1",
      children: <CreateTodo customClasses={customStyles} />,
    },
  ]);

  return (
    <ModalContext.Provider value={{ modals, createModal, destroyModal: closeForm }}>{children}</ModalContext.Provider>
  );
};

export const ModalList: React.FC<{}> = () => {
  const { modals } = useContext(ModalContext);

  return modals.length > 0 ? (
    <ul className={styles.modalsWrapper}>
      {modals.map((modal) => {
        console.log(modal.uuid);
        return <Modal {...modal} key={modal.uuid} />;
      })}
    </ul>
  ) : (
    <></>
  );
};
