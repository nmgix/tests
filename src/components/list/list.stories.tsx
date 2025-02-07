import type { Meta, StoryObj } from "@storybook/react";

import { List } from "./list";

const meta = {
  title: "List",
  component: List,
  args: {}
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
