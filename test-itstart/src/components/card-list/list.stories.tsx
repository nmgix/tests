import type { Meta, StoryObj } from "@storybook/react";

import { CardList } from "./list";
import { use, useEffect, type JSX } from "react";
import { Seminar } from "@/shared/seminar";
import { SeminarsContext } from "@/shared/seminars-context";
import { toast } from "react-toastify";
import { deleteCardUpdateUI, editCardUpdateUI } from "./ui-update";
import { CardProps } from "../card/card";
import { replaceRange } from "@/shared/array";

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
      await seminarsCtx.apiFetchSeminars<Seminar[]>(
        { from: 0, limit: 5 },
        () => seminarsCtx.setSeminars(createMockSeminars(5)),
        seminars => {
          console.log(seminars);
          if (!seminars) return;
          seminarsCtx.setSeminars(prev => replaceRange(prev ?? [], 0, 5, seminars));
        }
      );
    })();
  }, []);

  return (
    <>
      {seminarsCtx.seminars === null && <mark>сейчас моковые данные загрузятся</mark>}
      <CardList
        preloadSekeletonAmount={3}
        timeout={100}
        items={seminarsCtx.seminars?.map(s => ({
          seminar: s,
          loading: false,
          onDeleteCb: deleteCardUpdateUI.bind(null, seminarsCtx) as unknown as CardProps["onDeleteCbFail"],
          onDeleteCbFail: deleteCardUpdateUI.bind(null, seminarsCtx) as unknown as CardProps["onDeleteCb"],
          onEditCb: editCardUpdateUI.bind(null, seminarsCtx) as unknown as CardProps["onEditCb"], //ибо ещё ctx просит, мб стоит через .bind добавить
          onEditCbFail: editCardUpdateUI.bind(null, seminarsCtx) as unknown as CardProps["onEditCbFail"] //ибо ещё ctx просит, мб стоит через .bind добавить
        }))}
      />
    </>
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
