import { NotificationList as Component } from "./NotificationList";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Provider } from "react-redux";
import store from "@/store/store";

// import { v4 as uuid } from "uuid";

export default {
  title: "Notification",
  component: Component,
} as ComponentMeta<typeof Component>;

const GenericNotificationListComponent: ComponentStory<typeof Component> = () => (
  <Provider store={store}>
    <Component />
  </Provider>
);

export const NotificationListComponent = GenericNotificationListComponent.bind({});
