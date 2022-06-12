import React, { useCallback, useEffect, useRef, useState } from "react";
import { CargoItem, CompareType, SortingData, SortingWindowProps } from "../../types";
import "./navigation.scss";

const NavigationBar: React.FC<{
  availableColumns: string[];
  filterOptions: CompareType[];
  array: CargoItem[];
  updateArray: React.Dispatch<any>;
}> = ({ availableColumns, filterOptions, array, updateArray }) => {
  const sortingButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        event.target !== sortingButtonRef.current
      ) {
        setSortingData((state) => {
          return { ...state, open: false };
        });
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const position = useRef({ x: 0, y: 0 }); //обновлять стейт на каждом рендере дорого
  const [sortingWindowData, setSortingData] = useState<SortingWindowProps>({
    open: false,
    sortingData: {
      column: "",
      compare: filterOptions.find((option) => option.id === 0)!,
      search: "",
    },
  });

  const onSortingDataChange = useCallback(
    (data: SortingData) => {
      const { column, search } = data;
      var resultArray: CargoItem[] = JSON.parse(JSON.stringify(array));
      if (sortingWindowData.sortingData.compare.id !== 0) {
        var result = filterOptions.find((option) => option.id === sortingWindowData.sortingData.compare.id)!
          .compareFunction!(resultArray, column, search);
        updateArray(result);
      }
    },
    [sortingWindowData.sortingData]
  );

  useEffect(() => {
    onSortingDataChange(sortingWindowData.sortingData);
  }, [sortingWindowData.sortingData]);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <nav>
      <div className='title'>
        <h3>React Tables</h3>
        <span>Made for Kanal Servis</span>
      </div>
      <button
        onClick={() =>
          setSortingData((state) => {
            return { ...state, open: !state.open };
          })
        }
        ref={sortingButtonRef}>
        Сортировка
      </button>
      {sortingWindowData.open ? (
        <form
          onSubmit={(e) => onFormSubmit(e)}
          className='sorting-wrapper'
          ref={dropdownRef}
          style={{ top: position.current.y, left: position.current.x }}>
          <div className='sorting-list sorting-column'>
            <h3 className='title'>
              Колонка:{" "}
              {sortingWindowData.sortingData.column.length > 0 ? sortingWindowData.sortingData.column : "Не выставлена"}
            </h3>
            <ul className='vertical'>
              {availableColumns.map((column) => (
                <li
                  onClick={() => {
                    setSortingData((state) => {
                      return { ...state, sortingData: { ...state.sortingData, column: column } };
                    });
                  }}
                  key={column}>
                  <button className={`${sortingWindowData.sortingData.column === column ? "active" : ""}`}>
                    {column}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className='sorting-list sorting-compare'>
            <h3 className='title'>
              Тип сравнения: {filterOptions.find((el) => el.id === sortingWindowData.sortingData.compare.id)!.text}
            </h3>
            <ul className='horizontal'>
              {filterOptions.map((option) => (
                <li
                  onClick={() =>
                    setSortingData((state) => {
                      return { ...state, sortingData: { ...state.sortingData, compare: option } };
                    })
                  }
                  key={option.id}>
                  <button className={`${sortingWindowData.sortingData.compare.id === option.id ? "active" : ""}`}>
                    {option.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className='sorting-list sorting-misc'>
            <input
              onChange={(e) =>
                setSortingData((state) => {
                  return { ...state, sortingData: { ...state.sortingData, search: e.target.value } };
                })
              }
              value={sortingWindowData.sortingData.search}
              placeholder={"Строка для фильтрации"}
              className='sorting-misc-input'
            />
            <button type='submit' className='sorting-misc-button'>
              Фильтровать
            </button>
          </div>
        </form>
      ) : (
        <></>
      )}
    </nav>
  );
};

export default NavigationBar;
