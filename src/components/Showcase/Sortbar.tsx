import React, { useEffect, useState } from "react";
import { Book } from "./Showcase";
import "./_sortbar.scss";
var downChevron = require("../../resources/images/down-chevron.svg").default;
var ascDesc = require("../../resources/images/ascdesc.svg").default;

export type Category = {
  id: number;
  name: string;
};

const DropdownMenu: React.FC<{
  categories: Category[];
  closeMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setCategory: React.Dispatch<React.SetStateAction<number>>;
}> = ({ categories, closeMenu, setCategory }) => {
  const setCurrentCategory = (categoryId: number) => {
    closeMenu(false);
    setCategory(categoryId);
  };

  if (categories) {
    return (
      <ul>
        {categories.map((category) => (
          <li key={category.id} onClick={() => setCurrentCategory(category.id)}>
            {category.name}
          </li>
        ))}
      </ul>
    );
  } else {
    return <></>;
  }
};

export const Sortbar: React.FC<{
  books: Book[];
  setSortedBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  setCurrentCategory: React.Dispatch<React.SetStateAction<number>>;
  asc: boolean;
  setAsc: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ books, setSortedBooks, setCurrentCategory, asc, setAsc }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const GetCategories = () => {
    return setCategories([
      {
        id: 1,
        name: "Дизайн",
      },
      {
        id: 2,
        name: "Управление проектами",
      },
      {
        id: 3,
        name: "Разработка",
      },
      {
        id: 4,
        name: "Тестирование",
      },
    ]);
  };
  useEffect(() => {
    GetCategories();
  }, []);

  const sortBooks = (books: Book[]) => {
    if (asc) {
      setSortedBooks(books.sort((book1, book2) => book1.price - book2.price));
    } else {
      setSortedBooks(books.sort((book1, book2) => book2.price - book1.price));
    }
  };
  useEffect(() => {
    sortBooks(books);
  }, [asc]);

  return (
    <div className='sortbar'>
      <button onClick={() => setAsc(!asc)} className='button button-m'>
        Соритровать по цене <img src={ascDesc} alt='Сортировка' />
      </button>
      <div className='categories'>
        <button onClick={() => setMenuOpen(!menuOpen)} className='button button-m'>
          Категории <img src={downChevron} alt='Категории' />
        </button>
        {menuOpen ? (
          <DropdownMenu categories={categories} closeMenu={setMenuOpen} setCategory={setCurrentCategory} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
