import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BookPage } from "./BookPage";

export default {
  title: "BookPage",
  component: BookPage,
} as ComponentMeta<typeof BookPage>;

const GenericBookPage: ComponentStory<typeof BookPage> = (args) => <BookPage/>;

export const DefaultBookPage = GenericBookPage.bind({});