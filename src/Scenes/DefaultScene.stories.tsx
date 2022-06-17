import { DefaultScene } from "./DefaultScene";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Scenes/Default Cards",
  component: DefaultScene,
} as ComponentMeta<typeof DefaultScene>;

const GenericScene: ComponentStory<typeof DefaultScene> = ({ backgroundImage }) => (
  <DefaultScene backgroundImage={backgroundImage} />
);

export const Scene = GenericScene.bind({});

Scene.args = {
  backgroundImage: "/images/Pattern.png",
};
