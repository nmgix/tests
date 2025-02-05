import { Notification as Component } from "./Notification";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Provider } from "react-redux";
import store from "@/store/store";

import { v4 as uuid } from "uuid";

export default {
  title: "Notification",
  component: Component,
} as ComponentMeta<typeof Component>;

const GenericNotificationComponent: ComponentStory<typeof Component> = (args) => (
  <Provider store={store}>
    <Component {...args} />
  </Provider>
);

export const NotificationComponent = GenericNotificationComponent.bind({});
NotificationComponent.args = {
  content: "Строчка для информирования о какой-то новости",
  timeout: 10000,
  type: "informative",
  uuid: uuid(),
};
