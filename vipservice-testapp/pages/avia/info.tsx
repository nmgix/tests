import { BookData } from "../../types/BookData";
import { GetServerSideProps } from "next";
import { server } from "../../config/projectSetup";
import styles from "../../styles/pages/aviaInfo.module.scss";
import classNames from "classnames";
import CardWrapper from "../../components/Card/CardWrapper/CardWrapper";

const AviaInfo: React.FC<{ books: BookData[] }> = ({ books }) => {
  return (
    <div className={classNames(styles.aviaInfo)}>
      <ul className={classNames(styles.booksWrapper)}>
        {books.map((book) => (
          <li key={book.uuid}>
            <CardWrapper book={book} />
          </li>
        ))}
      </ul>
    </div>
  );
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
