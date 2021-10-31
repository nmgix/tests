import React from "react";

const SortingBar = ({ stateData: { currentColumn, ascendingSort }, setCurrentColumn, setAscendingSort }) => {
  const changeAscending = (category) => {
    if (!category) {
      setCurrentColumn(false);
      setAscendingSort(false);
      return;
    }
    if (currentColumn === category) {
      return setAscendingSort(!ascendingSort);
    } else if (!currentColumn || currentColumn !== category) {
      setCurrentColumn(category);
      setAscendingSort(true); //по возрастанию
    }
  };

  const SortButton = ({ category }) => {
    return (
      <button onClick={() => changeAscending(category)}>
        <b>{category[0].toUpperCase() + category.substring(1)}</b>
        {currentColumn === category && (ascendingSort === true ? <>+</> : <>-</>)}
      </button>
    );
  };

  return (
    <div style={{ display: "flex", marginTop: "0.5em" }}>
      <SortButton category='title' />
      <SortButton category='first' />
      <SortButton category='last' />
      <SortButton category='email' />
      <SortButton category='nat' />

      <button onClick={() => changeAscending(false)}>
        <b>Сбросить</b>
      </button>
    </div>
  );
};

export default SortingBar;
