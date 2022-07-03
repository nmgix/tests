import axios, { AxiosResponse } from "axios";
import { makeAutoObservable, observable, runInAction } from "mobx";
import { GoogleBook, GoogleBooksAPIResults } from "../types/GoogleBookTypes";
import { SearchDaraProps } from "../types/SearchTypes";

export class SearchStore {
  public searchState: SearchDaraProps = observable({
    category: "all",
    searchString: "",
    sortBy: "relevance",
  });
  constructor() {
    makeAutoObservable(this);
  }

  public updateData = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    this.searchState = { ...this.searchState, [e.currentTarget.name]: e.currentTarget.value };
  };
}

export const searchStore = new SearchStore();
