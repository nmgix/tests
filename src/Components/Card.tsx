import React, { useEffect, useRef, useState } from "react";
import "_card.scss";

export type CardProps = {
  id: number;
  size: {
    width: number;
    height: number;
  };
  selected?: boolean;
  hovered?: boolean;
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
  style?: React.CSSProperties;
};

export const Card: React.FC<CardProps> = ({
  id,
  size,
  hovered,
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
  style,
}) => {
  const [isSelected, setSelected] = useState<boolean>(selected ? selected : false);
  const handleCardSelect = (e: React.MouseEvent<HTMLElement>) => {
    // console.log(e.currentTarget, e.target); // возвращает один и тот-же элемент
    setSelected(!isSelected);
  };
  useEffect(() => {
    setSelected(selected !== undefined ? selected : false);
    setHover(hovered !== undefined ? hovered : false);
  }, [selected, hovered]);

  const [hover, setHover] = useState<boolean>(false);

  return (
    <button
      id={`card${id}`}
      className={`card ${isSelected ? "card-selected" : ""}`}
      disabled={outOfStock}
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <div className='card-content-wrapper' onClick={handleCardSelect}>
        <div
          className='card-content'
          style={{ backgroundColor: backgroundColor, width: size.width + "px", height: size.height + "px" }}>
          <div className='card-content-description'>
            {hover && isSelected ? (
              <p className='card-content-description-above card-undercard'>{aboveTitle.selected}</p>
            ) : (
              <p className='card-content-description-above'>{aboveTitle.default}</p>
            )}
            <h1 className='card-content-description-title'>{mainTitle}</h1>
            <h3 className='card-content-description-under'>{mainComponent}</h3>
            <ul className='card-content-description-bonuses'>
              {/* i как key это плохо, но параметры динамически обновляться не собираются */}
              {parameters.map((param, i) => (
                <li className='card-content-description-bonuses-bonus' key={i}>
                  {param}
                </li>
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
        <p className='warning-text'>Печалька, {mainComponent} закончился.</p>
      )}
    </button>
  );
};
