import React, { FormEvent, useEffect, useState } from "react";
import { Book } from "./Showcase";
import "./_sortbar.scss";
import axios from "axios";
var downChevron = require("../../resources/images/down-chevron.svg").default;
var ascDesc = require("../../resources/images/ascdesc.svg").default;
var searchIcon = require("../../resources/images/search.svg").default;

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
  sortedBooks: Book[];
  currentCaterogy: number;
  setSortedBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  setCurrentCategory: React.Dispatch<React.SetStateAction<number>>;
  asc: boolean;
  setAsc: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ books, sortedBooks, currentCaterogy, setSortedBooks, setCurrentCategory, asc, setAsc }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>("");

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

  const sortBooks = (books: Book[], asc: boolean) => {
    if (asc) {
      setSortedBooks(books.sort((book1, book2) => book1.price - book2.price));
    } else {
      setSortedBooks(books.sort((book1, book2) => book2.price - book1.price));
    }
  };

  const findBooks = async () => {
    const body = {
      filters: {
        search: searchString,
        sortPrice: asc ? "ASC" : "DESC",
        categoryId: currentCaterogy,
      },
    };

    const res = await axios.post("http://45.8.249.57/bookstore-api/books", body);

    return setSortedBooks(res.data);
  };
  useEffect(() => {
    if (searchString.length === 0) {
      setSortedBooks(books);
    }
  }, [searchString]);
  useEffect(() => {
    findBooks();
  }, [currentCaterogy]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    findBooks();
  };

  return (
    <div className='sortbar'>
      <button
        onClick={() => {
          setAsc(!asc);
          sortBooks(sortedBooks, !asc);
        }}
        className='button button-m'>
        Соритровать по цене <img src={ascDesc} alt='Сортировка' draggable={false} />
      </button>
      <div className='categories'>
        <button onClick={() => setMenuOpen(!menuOpen)} className='button button-m'>
          Категории <img src={downChevron} alt='Категории' draggable={false} />
        </button>
        {menuOpen ? (
          <DropdownMenu categories={categories} closeMenu={setMenuOpen} setCategory={setCurrentCategory} />
        ) : (
          <></>
        )}
      </div>
      <div className='input-wrapper input-wrapper-search'>
        <img onClick={findBooks} src={searchIcon} alt='search' draggable={false} />
        <form onSubmit={(e) => onSubmit(e)}>
          <input
            value={searchString}
            onChange={(e) => setSearchString(e.currentTarget.value)}
            placeholder='Начните вводить название книги'
            className='input'
            type={"text"}
          />
        </form>
      </div>
    </div>
  );
};
