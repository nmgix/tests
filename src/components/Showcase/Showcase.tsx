import "./_showcase.scss";
import { Sortbar } from "./Sortbar";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../store/Context";
import { AddItem } from "../../store/ActionCreators";

export type Book = {
  name: string;
  authorName: string;
  price: number;
  coverUrl: string;
  categoryId: number;
};

export const Showcase = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [sortedBooks, setSortedBooks] = useState<Book[]>(books);
  const [asc, setAsc] = useState<boolean>(false); // сначала самые дорогие (desc)
  const [currentCategory, setCurrentCategory] = useState<number>(0);
  const { dispatch } = useContext(Context);

  const GetBooks = () => {
    return setBooks([
      {
        name: "Отзывчивый веб-дизайн",
        authorName: "Итан Маркотт",
        price: 349,
        coverUrl: "http://45.8.249.57/public/6012485021.webp",
        categoryId: 1,
      },
      {
        name: "Эмоциональный веб-дизайн",
        authorName: "Аарон Уолтер",
        price: 349,
        coverUrl: "http://45.8.249.57/public/6012485032.webp",
        categoryId: 1,
      },
      {
        name: "Дизайн — это работа",
        authorName: "Майк Монтейро",
        price: 349,
        coverUrl: "http://45.8.249.57/public/6013099362.webp",
        categoryId: 1,
      },
      {
        name: "Управление проектами от А до Я",
        authorName: "Ричард Ньютон",
        price: 675,
        coverUrl: "http://45.8.249.57/public/6083509554.webp",
        categoryId: 2,
      },
      {
        name: "Чистый код: создание, анализ и рефакторинг",
        authorName: "Роберт Мартин",
        price: 700,
        coverUrl: "http://45.8.249.57/public/6189288048.webp",
        categoryId: 3,
      },
      {
        name: "Бизнес с нуля",
        authorName: "Эрик Рис",
        price: 920,
        coverUrl: "http://45.8.249.57/public/6304182856.webp",
        categoryId: 2,
      },
      {
        name: "Идеальный программист",
        authorName: "Роберт Мартин",
        price: 1020,
        coverUrl: "http://45.8.249.57/public/6264960718.webp",
        categoryId: 3,
      },
      {
        name: "Не заставляйте меня думать",
        authorName: "Стив Круг",
        price: 1169,
        coverUrl: "http://45.8.249.57/public/6053518393.webp",
        categoryId: 1,
      },
      {
        name: "Как пасти котов",
        authorName: "Дж.Ханк Рейнвотер",
        price: 1207,
        coverUrl: "http://45.8.249.57/public/6277282274.webp",
        categoryId: 2,
      },
      {
        name: "Пять пороков команды",
        authorName: "Патрик Ленсиони",
        price: 1649,
        coverUrl: "http://45.8.249.57/public/6206226336.webp",
        categoryId: 2,
      },
      {
        name: "Совершенный код",
        authorName: "Стив Макконнелл",
        price: 1787,
        coverUrl: "http://45.8.249.57/public/6190014646.webp",
        categoryId: 3,
      },
      {
        name: "Scrum. Революционный метод управления проектами",
        authorName: "Джефф Сазерленд",
        price: 1937,
        coverUrl: "http://45.8.249.57/public/6280422562.webp",
        categoryId: 2,
      },
      {
        name: "Модульные системы в графическом дизайне",
        authorName: "Йозеф Мюллер-Брокманн",
        price: 2048,
        coverUrl: "http://45.8.249.57/public/6252844739.webp",
        categoryId: 1,
      },
      {
        name: "Deadline. Роман об управлении проектами",
        authorName: "Том Демарко",
        price: 2448,
        coverUrl: "http://45.8.249.57/public/6277899275.webp",
        categoryId: 2,
      },
      {
        name: "Код: тайный язык информатики",
        authorName: "Чарльз Петцольд",
        price: 2479,
        coverUrl: "http://45.8.249.57/public/6292446592.webp",
        categoryId: 3,
      },
      {
        name: "Программист-прагматик",
        authorName: "Дэвид Томас, Эндрю Хант",
        price: 3495,
        coverUrl: "http://45.8.249.57/public/6016016523.webp",
        categoryId: 3,
      },
      {
        name: "Шаблоны корпоративных приложений",
        authorName: "Мартин Фаулер",
        price: 4295,
        coverUrl: "http://45.8.249.57/public/6225046249.webp",
        categoryId: 3,
      },
      {
        name: "Рефакторинг. Улучшение проекта, существующего кода",
        authorName: "Мартин Фаулер",
        price: 7125,
        coverUrl: "http://45.8.249.57/public/6114690274.webp",
        categoryId: 3,
      },
      {
        name: "Алгоритмы. Построение и анализ",
        authorName: "Томас Кормен, Чарльз Лейзерсон, Рональд Ривест, Клиффорд Штайн",
        price: 16875,
        coverUrl: "http://45.8.249.57/public/6120969471.webp",
        categoryId: 3,
      },
    ]);
  };

  useEffect(() => {
    GetBooks();
  }, []);
  useEffect(() => {
    setSortedBooks(books);
  }, [books]);

  const getId = (imageUrl: string): string => {
    // eslint-disable-next-line
    const regExp = /[^\/]+$/g;

    var findResult = imageUrl.search(regExp);
    var result = imageUrl.slice(findResult);

    return result.replace('.webp"', "");
  };

  return (
    <div className='showcase'>
      <Sortbar
        books={books}
        sortedBooks={sortedBooks}
        setSortedBooks={setSortedBooks}
        setCurrentCategory={setCurrentCategory}
        asc={asc}
        setAsc={setAsc}
        currentCaterogy={currentCategory}
      />
      <div className='book-list'>
        {sortedBooks.length > 0 ? (
          sortedBooks.map((book, i) => (
            <div className='book' key={i}>
              <img src={book.coverUrl} alt='' draggable={false} />
              <div className='book-info'>
                <h3>{book.name}</h3>
                <div className='book-priceinfo'>
                  <span>
                    <h3>{book.price}</h3> руб.
                  </span>
                  <button
                    className='button-main button-x'
                    onClick={() =>
                      AddItem(dispatch, {
                        id: getId(book.coverUrl),
                        count: 1,
                        price: book.price,
                        title: book.name,
                      })
                    }>
                    В корзину
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 className='helper-text'>Нет книг</h1>
        )}
      </div>
    </div>
  );
};
