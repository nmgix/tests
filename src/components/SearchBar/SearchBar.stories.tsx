import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SearchBar } from "./SearchBar";

export default {
  title: "SearchBar",
  component: SearchBar,
} as ComponentMeta<typeof SearchBar>;

const GenericSearchBar: ComponentStory<typeof SearchBar> = (args) => <SearchBar />;

export const DefaultSearchBar = GenericSearchBar.bind({});