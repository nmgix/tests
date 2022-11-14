import { BookData } from "../../../types/BookData";

export const CardWrapper: React.FC<{ cards: BookData }> = ({ cards }) => {
  const { routes } = cards;

  console.log(cards);
  return (
    <div>
      <ul>{}</ul>
      <span>{routes.reduce((acc, curr) => acc + curr.priceInformation.price, 0)}</span>
    </div>
  );
};
