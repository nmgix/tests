import { Modal as Component, CreateTodo as ModalAlias } from "./Modal";
import { ComponentStory, ComponentMeta, configure } from "@storybook/react";
import { Provider } from "react-redux";
import store from "@/store/store";
import customStyles from "./createTodo.module.scss";

import { v4 as uuid } from "uuid";

export default {
  title: "Modal",
  component: Component,
} as ComponentMeta<typeof Component>;

const GenericModalComponent: ComponentStory<typeof Component> = (args) => (
  <Provider store={store}>
    <Component {...args} key={args.uuid} />
  </Provider>
);

export const ModalComponent = GenericModalComponent.bind({});
ModalComponent.args = {
  closeForm: () => console.log("clicked outside"),
  title: "Add new todo",
  uuid: uuid(),
  children: <ModalAlias customClasses={customStyles} />,
};
