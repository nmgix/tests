import { useState } from "react";

type FilterOptions = { text: string; value: number };
export type FilterProps = {
  text: string;
  params: FilterOptions[];
};

const Filter: React.FC<FilterProps> = ({ text, params }) => {
  const [dropdownMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [choosenOption, setOption] = useState<FilterOptions>();

  return (
    <div className='filter-wrapper'>
      <div className='filter'>
        <span>{text}</span>
        <p onClick={() => setMenuOpen(!dropdownMenuOpen)}>{choosenOption?.text}</p>
      </div>
      {dropdownMenuOpen ? (
        <ul className='filter-dropdown'>
          {params.map((param) => (
            <li
              onClick={() => {
                setOption(param);
                setMenuOpen(false);
              }}>
              {param.text}
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

const NavigationBar: React.FC<{ filters: FilterProps[] }> = ({ filters }) => {
  return (
    <nav>
      <ul>
        {filters.map((filter) => (
          <li>
            <Filter {...filter} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
