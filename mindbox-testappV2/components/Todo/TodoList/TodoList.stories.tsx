import { TodoList as Component } from "./TodoList";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Provider } from "react-redux";
import store from "@/store/store";

export default {
  title: "Todo",
  component: Component,
} as ComponentMeta<typeof Component>;

const GenericTodoList: ComponentStory<typeof Component> = () => (
  <Provider store={store}>
    <Component />
  </Provider>
);

export const TodoList = GenericTodoList.bind({});
