import type { Args, Meta, StoryObj } from "@storybook/react";

import { CardList } from "./list";
import { Card, CardProps } from "../card";
import { use, useEffect, useState, type JSX } from "react";
import { Seminar } from "@/shared/seminar";
import { SeminarsContext } from "@/shared/seminars-context";

const mockSeminar = {
  id: 11,
  title: "Мастер-класс от Kosmoteros",
  description: "Практический мастер-класс по использованию инновационных косметических средств.",
  date: "17.02.2025",
  time: "18:00",
  photo:
    "https://images.unsplash.com/photo-1736636990289-d891ac0decc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxODY2Nzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzkwMjUzNDV8&ixlib=rb-4.0.3&q=80&w=1080"
};

// const createMockCards = (amount = 5, onDeleteCb: CardProps["onDeleteCb"], onEditCb: CardProps["onEditCb"]): CardProps[] => {
//   return Array(amount)
//     .fill(null)
//     .map((_, i) => ({
//       seminar: { ...mockSeminar, id: mockSeminar.id + i },
//       onDeleteCb,
//       onEditCb
//     }));
// };
const createMockSeminars = (amount = 5): Seminar[] => {
  return Array(amount)
    .fill(null)
    .map((_, i) => ({ ...mockSeminar, id: mockSeminar.id + i }));
};

const ListWrapper: () => JSX.Element = () => {
  const seminarsCtx = use(SeminarsContext);
  // const [cardProps, setCardProps] = useState<CardProps[]>();

  useEffect(() => {
    (async () => {
      await seminarsCtx.apiFetchSeminars(0, 5, () => seminarsCtx.setSeminars(createMockSeminars(5)));
    })();
  }, []);

  return (
    <CardList
      preloadSekeletonAmount={3}
      timeout={100}
      items={seminarsCtx.seminars?.map(s => ({
        seminar: s,
        loading: false,
        onDeleteCb: cId => seminarsCtx.setSeminars(prev => (prev ? prev.filter(pS => pS.id !== cId) : [])),
        onEditCb: newSeminar => {
          seminarsCtx.setSeminars(prev => {
            if (!prev || !seminarsCtx.seminars) {
              console.log("no prev array");
              return null;
            }
            const prevDataIdx = seminarsCtx.seminars?.findIndex(s => s.id == newSeminar.id);
            if (prevDataIdx < 0) {
              console.log("didnt find card with this id");
              return prev;
            }
            const prevData = seminarsCtx.seminars[prevDataIdx];
            if (!prevData) {
              console.log("prev data not found");
              return prev;
            }

            const newData = {
              id: newSeminar?.id ?? prevData?.id ?? -1,
              date: newSeminar?.date ?? prevData?.date ?? "01.01.1970",
              description: newSeminar?.description ?? prevData?.description ?? "ошибка при обновлении описания",
              photo: newSeminar?.photo ?? prevData?.photo ?? "ошибка при обновлении фото",
              time: newSeminar?.time ?? prevData?.time ?? "00:00",
              title: newSeminar?.title ?? prevData?.title ?? "ошибка при обновлении заголовка"
            };

            // надежнее было бы новый стейт с апи запросить, наверное

            console.log(newData);

            return prev.map(pSeminar => (pSeminar.id !== prevData.id ? pSeminar : newData));
          });
        }
      }))}
    />
  );
};

const meta = {
  title: "List",
  component: ListWrapper,
  args: {}
} satisfies Meta<typeof ListWrapper>;

export default meta;
type Story = StoryObj<typeof ListWrapper>;

export const Default: Story = {};
