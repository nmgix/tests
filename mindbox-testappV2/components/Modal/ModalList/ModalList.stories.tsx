import { ModalContext, ModalList as Component, ModalList, ModalProvider } from "./ModalList";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Provider } from "react-redux";
import store from "@/store/store";
import customModalStyles from "../ModalElement/createTodo.module.scss";

import { useContext } from "react";
import { CreateTodo } from "../ModalElement/Modal";

export default {
  title: "Modal",
  component: Component,
} as ComponentMeta<typeof Component>;

const Button = () => {
  const { createModal } = useContext(ModalContext);

  return (
    <button
      style={{ width: "120px", height: "30px" }}
      onClick={() =>
        createModal({ children: <CreateTodo customClasses={customModalStyles} />, title: "Create new Todo" })
      }>
      Create modal
    </button>
  );
};

const GenericModalListComponent: ComponentStory<typeof Component> = (args) => (
  <Provider store={store}>
    <ModalProvider>
      <ModalList />
      <Button />
    </ModalProvider>
  </Provider>
);

export const ModalListComponent = GenericModalListComponent.bind({});
