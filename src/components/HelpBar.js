import React from "react";

const HelpBar = ({ stateData, setCurrentPage, setCurrentColumn, setAscendingSort, setSearchText }) => {
  //функция нужна для просчёта кол-ва страниц, делится число на 2 без остатка?
  //?да = кол-во юзеров/50 = прямое число
  //?нет = кол-во юзеров/50+1 = число с +1 страницей для остатка от деления кол-ва юзеров
  const countMaxPages = (dataMax) => {
    return (dataMax / 50) % 2 !== 0 ? Math.floor(dataMax / 50) + 1 : Math.floor(dataMax / 50);
  };

  //кривая пагинация через кейсы, зато без спагетти-кода
  const paginationCheck = (usersCount, currentPage) => {
    switch (currentPage) {
      case 1:
        //   первая страница
        return (
          <>
            <span>1</span>
            {countMaxPages(usersCount) > 2 && <button onClick={() => setCurrentPage(2)}>2</button>}
            {/* <button onClick={() => setCurrentPage(2)}>2</button> */}
            {countMaxPages(usersCount) > 3 && <button onClick={() => setCurrentPage(3)}>3</button>}
            {/* <button onClick={() => setCurrentPage(3)}>3</button> */}
            {countMaxPages(usersCount) > 1 && (
              <>
                ...
                <button onClick={() => setCurrentPage(countMaxPages(usersCount))}>{countMaxPages(usersCount)}</button>
              </>
            )}
          </>
        );
      case 2:
        // вторая страница
        return (
          <>
            <button onClick={() => setCurrentPage(1)}>1</button>
            <span>2</span>
            {countMaxPages(usersCount) > 3 && <button onClick={() => setCurrentPage(3)}>3</button>}
            {countMaxPages(usersCount) > 3 && (
              <>
                ...
                <button onClick={() => setCurrentPage(countMaxPages(usersCount))}>{countMaxPages(usersCount)}</button>
              </>
            )}
          </>
        );
      case countMaxPages(usersCount) - 1:
        // предпоследняя страница
        return (
          <>
            <button onClick={() => setCurrentPage(1)}>1</button>
            ...
            <button onClick={() => setCurrentPage(countMaxPages(usersCount) - 2)}>
              {countMaxPages(usersCount) - 2}
            </button>
            <span>{countMaxPages(usersCount) - 1}</span>
            <button onClick={() => setCurrentPage(countMaxPages(usersCount))}>{countMaxPages(usersCount)}</button>
          </>
        );
      case countMaxPages(usersCount):
        // последняя страница
        return (
          <>
            <button onClick={() => setCurrentPage(1)}>1</button>
            ...
            <button onClick={() => setCurrentPage(countMaxPages(usersCount) - 2)}>
              {countMaxPages(usersCount) - 2}
            </button>
            <button onClick={() => setCurrentPage(countMaxPages(usersCount) - 1)}>
              {countMaxPages(usersCount) - 1}
            </button>
            <span>{countMaxPages(usersCount)}</span>
          </>
        );
      default:
        return (
          <>
            <button onClick={() => setCurrentPage(1)}>1</button>
            ...
            <button onClick={() => setCurrentPage(stateData.currentPage - 1)}>{stateData.currentPage - 1}</button>
            <span>{stateData.currentPage}</span>
            <button onClick={() => setCurrentPage(stateData.currentPage + 1)}>{stateData.currentPage + 1}</button>
            ...
            <button onClick={() => setCurrentPage(countMaxPages(usersCount))}>{countMaxPages(usersCount)}</button>
          </>
        );
    }
  };

  const changePage = (usersCount, currentPage, incrementing) => {
    if (incrementing) {
      if (countMaxPages(usersCount) > currentPage) {
        setCurrentPage(currentPage + 1);
      }
    } else {
      if (currentPage !== 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: "2em" }}>
        <input placeholder='Поиск...' value={stateData.searchText} onChange={(e) => setSearchText(e.target.value)} />
      </div>
      <button onClick={() => changePage(stateData.usersCount, stateData.currentPage, false)}>-</button>
      <button
        onClick={() => changePage(stateData.usersCount, stateData.currentPage, true)}
        style={{ marginRight: "1em" }}>
        +
      </button>
      <div>{paginationCheck(stateData.usersCount, stateData.currentPage)}</div>
    </div>
  );
};

export default HelpBar;
