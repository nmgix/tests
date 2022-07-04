import { FormEvent } from "react";
import "./_searchBar.scss";
import { ReactComponent as SearchButtonIcon } from "../../resources/search-icon.svg";
import { PresetCategories, SortBy } from "../../types/SearchTypes";
import { useAction } from "../../redux/helpers/useAction";
import { useTypedSelector } from "../../redux/helpers/useTypedSelector";

export const SearchBar = () => {
  const { searchBooks, updateSearch } = useAction();
  const { state } = useTypedSelector((state) => state.search);
  const { category, searchString, sortBy } = state;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchBooks(searchString, category, sortBy, 0, "change");
  };

  return (
    <div className='search-bar'>
      <h2 className='search-bar-title'>Search for books</h2>
      <form onSubmit={onSubmit}>
        <div className='search-bar-request-bar'>
          <input name='searchString' value={searchString} onChange={updateSearch} />
          <button type='submit'>
            <SearchButtonIcon />
          </button>
        </div>
        <div className='search-bar-dropdown-wrapper'>
          <div className='search-bar-dropdown'>
            <label htmlFor='category'>Categories</label>
            <select name='category' onChange={updateSearch} value={category}>
              {Object.keys(PresetCategories)
                .filter((key) => !isNaN(Number(PresetCategories[key as keyof typeof PresetCategories])))
                .map((key) => (
                  <option value={key} key={key}>
                    {key}
                  </option>
                ))}
            </select>
          </div>
          <div className='search-bar-dropdown'>
            <label htmlFor='sortBy'>Sort by</label>
            <select name='sortBy' onChange={updateSearch} value={sortBy}>
              {Object.keys(SortBy)
                .filter((key) => !isNaN(Number(SortBy[key as keyof typeof SortBy])))
                .map((key) => (
                  <option value={key} key={key}>
                    {key}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};
