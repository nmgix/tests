import type { Args, Meta, StoryObj } from "@storybook/react";

import { List } from "./list";
import { Card, CardProps } from "../card";
import { useEffect, useState } from "react";

const meta = {
  title: "List",
  component: List,
  args: {}
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockSeminar = {
  id: 9,
  title: "Мастер-класс от Kosmoteros",
  description: "Практический мастер-класс по использованию инновационных косметических средств.",
  date: "17.02.2025",
  time: "18:00",
  photo:
    "https://images.unsplash.com/photo-1736636990289-d891ac0decc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxODY2Nzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzkwMjUzNDV8&ixlib=rb-4.0.3&q=80&w=1080"
};

export const Default: Story = {
  args: {
    items: Array(10)
      .fill(null)
      .map((_, i) => ({
        seminar: { ...mockSeminar, id: mockSeminar.id + i },
        onDelete: id => console.log(id),
        onEdit: id => console.log(id)
      })),
    ListItemComponent: Card,
    LoadingListItemComponent: Card,
    preloadSekeletonAmount: 3,
    timeout: 3000
  }
};

export const UndefinedList: Story = {
  args: {
    items: undefined,
    ListItemComponent: Card,
    LoadingListItemComponent: Card,
    preloadSekeletonAmount: 3,
    timeout: 3000
  }
};
