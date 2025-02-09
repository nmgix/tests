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
      .map(() => ({
        seminar: mockSeminar,
        onDelete: id => console.log(id)
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

const ElesLoader = (args: Omit<Story["args"], "items"> & { items: Promise<CardProps>[] }) => {
  const [_list, setList] = useState<CardProps[] | undefined>(undefined);

  useEffect(() => {
    const fetchElement = async (el: Promise<CardProps>) => {
      const item = await el;
      setList(prev => (prev !== undefined ? [...prev, item] : [item]));
    };

    for (const asyncI of args.items) {
      fetchElement(asyncI);
    }
  }, [args.items]);

  return <List {...args} items={_list} />;
};

const meta2 = {
  title: "List",
  component: ElesLoader,
  args: {}
} satisfies Meta<typeof ElesLoader>;
type Story2 = StoryObj<typeof meta2>;

export const LoadList: Story2 = {
  args: {
    items: Array(5)
      .fill(null)
      .map(async (_, i) => {
        return new Promise(res => setTimeout(() => res({ seminar: mockSeminar, onDelete: id => console.log(id) }), i * 500));
      }),
    timeout: 5000,
    ListItemComponent: Card,
    LoadingListItemComponent: Card,
    preloadSekeletonAmount: 3
  }
};
