import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BookPage } from "./components/Books/Bookpage/BookPage";
import { BookShelf } from "./components/Books/Bookshelf/BookShelf";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { store } from "./redux/store";
// import App from './App';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <SearchBar />
      <Routes>
        <Route path='/' element={<BookShelf />} />
        <Route path='/book/:bookId' element={<BookPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
