import { useEffect, useState } from "react";
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
}) => {
  const [isSelected, setSelected] = useState<boolean>(selected);
  useEffect(() => {
    setSelected(selected);
  }, [selected]);

  return (
    <button className={`card ${isSelected ? "card-selected" : ""}`} disabled={outOfStock}>
      <div className='card-content-wrapper'>
        <div className='card-content' style={{ backgroundColor: backgroundColor }}>
          <div className='card-content-description'>
            {!isSelected ? (
              <p className='card-content-description-above'>{aboveTitle.default}</p>
            ) : (
              <p className='card-content-description-above card-undercard'>{aboveTitle.selected}</p>
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
