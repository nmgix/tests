import { useState } from "react";
import "./navigation.scss";

const NavigationBar: React.FC<{ availableColumns: string[] }> = ({ availableColumns }) => {
  const [sortingDropdown, setDropdown] = useState<boolean>(false);
  const [sortingColumn, setColumn] = useState<string>("");
  const [sortingCompare, setCompare] = useState<string>("=");
  const [sortingString, setString] = useState<string>("");

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <nav>
      <button onClick={() => setDropdown(!sortingDropdown)}>Сортировка</button>
      {sortingDropdown ? (
        <form onSubmit={(e) => onFormSubmit(e)} className='sorting-wrapper'>
          <div className='sorting-list'>
            <h3>Колонка:</h3>
            <p>{sortingColumn}</p>
            <ul className='vertical'>
              {availableColumns.map((column) => (
                <li
                  onClick={() => {
                    setColumn(column);
                  }}
                  key={column}>
                  {column}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className='sorting-list'>
              <h3>Тип сравнения:</h3>
              <p>{sortingCompare}</p>
              <ul>
                <ul className='horizontal'>
                  <li onClick={() => setCompare(">")}>{`>`}</li>
                  <li onClick={() => setCompare("<")}>{`<`}</li>
                  <li onClick={() => setCompare("=")}>{`=`}</li>
                </ul>
              </ul>
            </div>
            <input
              onChange={(e) => setString(e.currentTarget.value)}
              value={sortingString}
              placeholder={"Строка для фильтрации"}
            />
          </div>
          <button type='submit'>Фильтровать</button>
        </form>
      ) : (
        <></>
      )}
    </nav>
  );
};

export default NavigationBar;
