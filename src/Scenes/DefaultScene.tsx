import { Card, CardProps } from "../Components/Card";
import "_defaultScene.scss";

import BackgroundImage from "../Content/images/Pattern.png";

const CardsProps: CardProps[] = [
  {
    id: 0,
    selected: false,
    aboveTitle: {
      default: <>Сказочное заморское яство</>,
      selected: <a href='#'>Котэ не одобряет?</a>,
    },
    mainTitle: "Нямушка",
    mainComponent: "с фуа-гра",
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
  },
  {
    id: 1,
    selected: false,
    aboveTitle: {
      default: <>Сказочное заморское яство</>,
      selected: <a href='#'>Котэ не одобряет?</a>,
    },
    mainTitle: "Нямушка",
    mainComponent: "с рыбой",
    parameters: [
      <>
        <b>40</b> порций
      </>,
      "2 мыши в подарок",
    ],
    productMass: 2,
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
      selected: <>Головы щучьи с чесноком да свежайшая сёмгушка.</>,
    },
    outOfStock: false,
    defaultFont: true,
    size: {
      width: 320,
      height: 480,
    },
    hovered: false,
  },
  {
    id: 2,
    selected: false,
    aboveTitle: {
      default: <>Сказочное заморское яство</>,
      selected: <a href='#'>Котэ не одобряет?</a>,
    },
    mainTitle: "Нямушка",
    mainComponent: "с курой",
    parameters: [
      <>
        <b>100</b> порций
      </>,
      "5 мышей в подарок",
      "заказчик доволен",
    ],
    productMass: 5,
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
      selected: <>Феле из цыплят с трюфелями в бульоне.</>,
    },
    outOfStock: true,
    defaultFont: true,
    size: {
      width: 320,
      height: 480,
    },
    hovered: false,
  },
];

export const DefaultScene = () => {
  return (
    <div className='scene' style={{ backgroundImage: `url(${BackgroundImage})` }}>
      <h1 className='scene-title'>Ты сегодня покормил кота?</h1>
      <ul className='scene-cards'>
        {CardsProps.map((props) => (
          <li>
            <Card {...props} key={props.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};
