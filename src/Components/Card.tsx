import React, { useEffect, useRef, useState } from "react";
import "_card.scss";

type CardProps = {
  selected: boolean;
  aboveTitle: {
    default: React.ReactElement;
    selected: React.ReactElement;
  };
  mainTitle: string;
  mainComponent: string;
  parameters: React.ReactElement[] | string[] | (string | React.ReactElement)[];
  productMass: number;
  produceMassUnits: string;
  backgroundColor: string;
  backgroundImage: {
    src: string;
    absolutePosition: {
      x: number;
      y: number;
    };
  };
  underCardText: {
    default: React.ReactElement;
    selected: React.ReactElement;
  };
  outOfStock: boolean;
  defaultFont: boolean; // для Storybook
};

export const Card: React.FC<CardProps> = ({
  selected,
  aboveTitle,
  mainTitle,
  mainComponent,
  parameters,
  productMass,
  produceMassUnits,
  backgroundColor,
  backgroundImage,
  underCardText,
  outOfStock,
  defaultFont,
}) => {
  const [isSelected, setSelected] = useState<boolean>(selected);
  const handleCardSelect = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setSelected(!isSelected);
  };
  useEffect(() => {
    setSelected(selected);
  }, [selected]);

  // сделано для Storybook'а чтобы можно было сранвить дефолтный Arial и Exo (в зипе был только тонкий шрифт)
  const [inlineStyles, setInlineStyles] = useState<React.CSSProperties>({});
  useEffect(() => {
    setInlineStyles((styles) => {
      return { ...styles, fontFamily: defaultFont ? "Arial" : "Exo" };
    });
  }, [defaultFont]);

  const [hover, setHover] = useState<boolean>(false);

  return (
    <button
      className={`card ${isSelected ? "card-selected" : ""}`}
      disabled={outOfStock}
      style={inlineStyles}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <div className='card-content-wrapper' onClick={handleCardSelect}>
        <div className='card-content' style={{ backgroundColor: backgroundColor }}>
          <div className='card-content-description'>
            {hover && isSelected ? (
              <p className='card-content-description-above card-undercard'>{aboveTitle.selected}</p>
            ) : (
              <p className='card-content-description-above'>{aboveTitle.default}</p>
            )}
            <h1 className='card-content-description-title'>{mainTitle}</h1>
            <h3 className='card-content-description-under'>c {mainComponent}</h3>
            <ul className='card-content-description-bonuses'>
              {parameters.map((param) => (
                <li className='card-content-description-bonuses-bonus' /*key={param}*/>{param}</li>
              ))}
            </ul>
          </div>
          <img
            style={{
              position: "absolute",
              top: `${backgroundImage.absolutePosition.y}%`,
              left: `${backgroundImage.absolutePosition.x}%`,
            }}
            src={backgroundImage.src}
          />
          <div className='card-content-mass'>
            <h1>{String(productMass).replace(".", ",")}</h1>
            <span>{produceMassUnits}</span>
          </div>
        </div>
      </div>
      {!outOfStock ? (
        !isSelected ? (
          <p className='card-undercard'>{underCardText.default}</p>
        ) : (
          <p className='card-undercard'>{underCardText.selected}</p>
        )
      ) : (
        <p className='warning-text'>Печалька, с {mainComponent} закончился.</p>
      )}
    </button>
  );
};
