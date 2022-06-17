// import "@src/index.scss";
import { Card } from "./Card";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useEffect, useState } from "react";

export default {
  title: "Components/Card",
  component: Card,
} as ComponentMeta<typeof Card>;

const GenericCard: ComponentStory<typeof Card> = (args) => {
  // сделано для Storybook'а чтобы можно было сранвить дефолтный Arial и Exo (в зипе был только тонкий шрифт)
  const [inlineStyles, setInlineStyles] = useState<React.CSSProperties>({});
  useEffect(() => {
    setInlineStyles((styles) => {
      return {
        ...styles,
        fontFamily: args.defaultFont ? "Arial" : "Exo",
      };
    });
  }, [args.defaultFont]);
  return <Card style={inlineStyles} {...args} />;
};

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
    src: "/Content/images/catLogo1.png",
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
  defaultFont: true,
  size: {
    width: 320,
    height: 480,
  },
  hovered: false,
};
