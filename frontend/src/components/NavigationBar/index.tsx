import { useEffect, useRef, useState } from "react";
import { CompareType } from "../../App";
import "./navigation.scss";

const NavigationBar: React.FC<{ availableColumns: string[]; filterOptions: CompareType[] }> = ({
  availableColumns,
  filterOptions,
}) => {
  const [sortingDropdown, setDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const [sortingColumn, setColumn] = useState<string>("Не выставлена");
  const [sortingCompare, setCompare] = useState<number>(0);
  const [sortingString, setString] = useState<string>("");

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <nav>
      <button onClick={() => setDropdown(!sortingDropdown)}>Сортировка</button>
      {sortingDropdown ? (
        <form onSubmit={(e) => onFormSubmit(e)} className='sorting-wrapper' ref={dropdownRef}>
          <div className='sorting-list sorting-column'>
            <h3 className='title'>Колонка: {sortingColumn}</h3>
            <ul className='vertical'>
              {availableColumns.map((column) => (
                <li
                  onClick={() => {
                    setColumn(column);
                  }}
                  key={column}>
                  <button className={`${sortingColumn == column ? "active" : ""}`}>{column}</button>
                </li>
              ))}
            </ul>
          </div>
          <div className='sorting-list sorting-compare'>
            <h3 className='title'>Тип сравнения: {filterOptions.find((el) => el.option == sortingCompare)!.text}</h3>
            <ul className='horizontal'>
              {filterOptions.map((option) => (
                <li onClick={() => setCompare(option.option)} key={option.option}>
                  <button className={`${sortingCompare == option.option ? "active" : ""}`}>{option.text}</button>
                </li>
              ))}
            </ul>
          </div>
          <div className='sorting-list sorting-misc'>
            <input
              onChange={(e) => setString(e.currentTarget.value)}
              value={sortingString}
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
