export enum PresetCategories {
    all, art, biography, computers, history, medical, poetry
  }
  export enum SortBy{
    relevance, newest
  } 
  export type SearchDaraProps = {
    searchString: string,
    category: keyof typeof PresetCategories;
    sortBy: keyof typeof SortBy;
  }