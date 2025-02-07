import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "./card";

const meta = {
  title: "Card",
  component: Card,
  args: {}
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
