import { DefaultScene } from "./DefaultScene";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Scenes/Default Cards",
  component: DefaultScene,
} as ComponentMeta<typeof DefaultScene>;

const GenericScene: ComponentStory<typeof DefaultScene> = () => <DefaultScene />;

export const Scene = GenericScene.bind({});
