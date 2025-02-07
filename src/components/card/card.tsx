import { Seminar } from "../../shared/seminar";

export type CardProps = {
  senimar: Seminar;
};

export const Card = ({ senimar }: CardProps) => {
  return <div></div>;
};

Card.displayName = "Card";
