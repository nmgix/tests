// import "@src/index.scss";
import { Card } from "./Card";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Basic/Card",
  component: Card,
} as ComponentMeta<typeof Card>;

const GenericCard: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const DefaultCard = GenericCard.bind({});

DefaultCard.args = {
  selected: false,
  aboveTitle: {
    default: <>Сказочное заморское яство</>,
    selected: <a href='#'>Котэ не одобряет?</a>,
  },
  mainTitle: "Нямушка",
  mainComponent: "фуа-гра",
  parameters: [
    <>
      <b>10</b> порций
    </>,
    "мышь в подарок",
  ],
  productMass: 0.5,
  produceMassUnits: "кг",
  backgroundColor: "#FFF",
  backgroundImage: {
    src: "/images/catLogo1.png",
    absolutePosition: {
      x: 0,
      y: 43,
    },
  },
  underCardText: {
    default: (
      <>
        Чего сидишь, порадуй{" "}
        <a href='#' className='underline-dashed'>
          котэ.
        </a>
      </>
    ),
    selected: <>Печень утки разварная с артишоками.</>,
  },
  outOfStock: false,
};
