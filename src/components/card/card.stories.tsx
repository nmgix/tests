import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "./card";
import { JSX, useState } from "react";
import { Seminar } from "@/shared/seminar";

const meta = {
  title: "Card",
  component: Card,
  args: {}
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const CardWrapper: (props: Story["args"]) => JSX.Element = props => {
  const [seminar, setSeminar] = useState<Seminar | null>({ ...props["seminar"]! });

  return (
    <Card
      {...props}
      seminar={seminar}
      onEditCb={newSeminar => {
        console.log(newSeminar);
        setSeminar(prev => ({
          id: newSeminar?.id ?? prev?.id ?? -1,
          date: newSeminar?.date ?? prev?.date ?? "01.01.1970",
          description: newSeminar?.description ?? prev?.description ?? "ошибка при обновлении описания",
          photo: newSeminar?.photo ?? prev?.photo ?? "ошибка при обновлении фото",
          time: newSeminar?.time ?? prev?.time ?? "00:00",
          title: newSeminar?.title ?? prev?.title ?? "ошибка при обновлении заголовка"
        }));
      }}
      onDeleteCb={() => setSeminar(null)}
    />
  );
};

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
    },
    loading: false,
    _imageTimeout: 3000 // не работает,
  },
  render: CardWrapper
};
