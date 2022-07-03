import axios, { AxiosResponse } from "axios";
import { makeAutoObservable, observable, runInAction } from "mobx";
import { GoogleBook, GoogleBooksAPIResults } from "../types/GoogleBookTypes";
import { PresetCategories, SortBy } from "../types/SearchTypes";

export class BookStore {
  public books: GoogleBook[] = observable([]);
  public error: string = "";
  constructor() {
    makeAutoObservable(this);
  }

  public async searchBooks(
    searchString: string,
    category: keyof typeof PresetCategories,
    sortBy: keyof typeof SortBy,
    fromIndex: number = 0,
    mode: "add" | "change" = "change",
    limit: number = 30
  ) {
    runInAction(() => (this.error = ""));
    try {
      const res = await axios
        .get<GoogleBooksAPIResults>(
          `${process.env.REACT_APP_GOOGLE_BOOKS_URL}q="${searchString.replace(" ", "+")}"${
            category !== "all" ? `+subject:${category}` : ""
          }&orderBy=${sortBy}&startIndex=${fromIndex}&maxResults=${limit}&keyes&key=${process.env.REACT_APP_GOOGLE_API}`
        )
        .then((res: AxiosResponse<GoogleBooksAPIResults>): GoogleBook[] => res.data.items);
      console.log(res);
      if (res === undefined) {
        throw new Error();
      } else {
        runInAction(() => {
          if (mode === "add") {
            console.log("adding");
            this.books = [...this.books, ...res];
          } else {
            console.log("changing");
            observable(this.books).clear();
            // observable(this.books).replace(res);
            this.books = res;
          }
        });
      }
    } catch (e) {
      runInAction(() => {
        this.error = "Books not found! Try another request";
      });
    }
  }
}

export const bookStore = new BookStore();
