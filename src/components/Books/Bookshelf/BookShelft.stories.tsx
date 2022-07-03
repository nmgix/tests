import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BookShelf } from "./BookShelf";

export default {
  title: "BookShelf",
  component: BookShelf,
} as ComponentMeta<typeof BookShelf>;

const GenericBookShelf: ComponentStory<typeof BookShelf> = (args) => <BookShelf {...args}/>;

export const DefaultBookShelf = GenericBookShelf.bind({});
DefaultBookShelf.args = {
    books: [
        
    ]
}