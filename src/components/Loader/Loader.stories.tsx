import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Loader } from "./Loader";

export default {
  title: "Loader",
  component: Loader,
} as ComponentMeta<typeof Loader>;

const GenericLoader: ComponentStory<typeof Loader> = (args) => <Loader />;

export const DefaultLoader = GenericLoader.bind({});