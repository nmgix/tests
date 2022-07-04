import React, { ChangeEvent, FormEvent, useState } from "react";
import "./_searchBar.scss";
import { ReactComponent as SearchButtonIcon } from "../../resources/search-icon.svg";
import { PresetCategories, SortBy } from "../../types/SearchTypes";
import { observer } from "mobx-react-lite";

export const SearchBar = observer(() => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // bookStore.searchBooks(searchString, category, sortBy, 0, "change");
  };

  // const { category, searchString, sortBy } = searchStore.searchState;
  // const { updateData } = searchStore;

  return (
    <div className='search-bar'>
      <h2 className='search-bar-title'>Search for books</h2>
      <form onSubmit={onSubmit}>
        <div className='search-bar-request-bar'>
          {/* <input name='searchString' value={searchString} onChange={updateData} /> */}
          <button type='submit'>
            <SearchButtonIcon />
          </button>
        </div>
        <div className='search-bar-dropdown-wrapper'>
          <div className='search-bar-dropdown'>
            <label htmlFor='category'>Categories</label>
            {/* <select name='category' onChange={updateData} value={category}>
              {Object.keys(PresetCategories)
                .filter((key) => !isNaN(Number(PresetCategories[key as keyof typeof PresetCategories])))
                .map((key) => (
                  <option value={key} key={key}>
                    {key}
                  </option>
                ))}
            </select> */}
          </div>
          <div className='search-bar-dropdown'>
            <label htmlFor='sortBy'>Sort by</label>
            {/* <select name='sortBy' onChange={updateData} value={sortBy}>
              {Object.keys(SortBy)
                .filter((key) => !isNaN(Number(SortBy[key as keyof typeof SortBy])))
                .map((key) => (
                  <option value={key} key={key}>
                    {key}
                  </option>
                ))}
            </select> */}
          </div>
        </div>
      </form>
    </div>
  );
});
