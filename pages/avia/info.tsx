import { BookData } from "../../types/BookData";
import { GetServerSideProps } from "next";
import { server } from "../../config/projectSetup";

const AviaInfo: React.FC<{ books: BookData[] }> = ({ books }) => {
  console.log(books);
  return <div></div>;
};

export default AviaInfo;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const data = (await fetch(`${server}/api/books/available`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query),
  }).then((res) => res.json())) as { availableBooks: BookData[] };

  return {
    props: {
      books: data.availableBooks,
    },
  };
};
