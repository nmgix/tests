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
  args: {
    seminar: {
      id: 9,
      title: "Мастер-класс от Kosmoteros",
      description: "Практический мастер-класс по использованию инновационных косметических средств.",
      date: "17.02.2025",
      time: "18:00",
      photo:
        "https://images.unsplash.com/photo-1736636990289-d891ac0decc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxODY2Nzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzkwMjUzNDV8&ixlib=rb-4.0.3&q=80&w=1080"
    }
  }
};
