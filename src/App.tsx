import { useEffect, useState } from "react";
import { NewTodoModal } from "./components/NewTodoModal";
import { RenderOptions } from "./components/RenderOptions";
import { RenderTodos } from "./components/RenderTodos";
import "./styles/_app.scss";

var plusSymbol = require("./resources/images/plusSymbol.png");

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type NewTodo = {
  title: string;
  completed: boolean;
};

export type RenderCodes = 0 | 1 | 2;

// const exampleTodos = [
//   {
//     id: 0,
//     title: "Тестовое приложение",
//     completed: true,
//   },
//   {
//     id: 1,
//     title: "Грустить",
//     completed: false,
//   },
//   {
//     id: 2,
//     title: "Настроить тесты",
//     completed: false,
//   },
// ];

function App() {
  const [todos, setTodos] = useState<Todo[]>(JSON.parse(localStorage.getItem("todos")!));
  const [currentRenderCode, setRenderCode] = useState<RenderCodes>(0);
  const [newTodoModalOpen, setModal] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent<HTMLFormElement>, todo: NewTodo) => {
    e.preventDefault();

    var nextIndex = todos[todos.length - 1] !== undefined ? todos[todos.length - 1].id + 1 : 0;
    var resultTodo: Todo = { id: nextIndex, ...todo };

    setTodos((state) => {
      return [...state, resultTodo];
    });
    setModal(false);
  };
  const changeTodoState = (currentTodo: Todo) => {
    setTodos((state) =>
      state.map((todo) => {
        if (todo.id === currentTodo.id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  };
  const clearCompletedTodos = () => {
    setTodos((state) => state.filter((todo) => todo.completed === false));
  };

  return (
    <div className='App'>
      {newTodoModalOpen ? <NewTodoModal addTodo={addTodo} setModal={setModal} /> : <></>}
      <h1>
        todos <span className='title'>{todos.length} left</span>
      </h1>
      <div className='status-bar'>
        <h4 className='title'>{todos.length} todos left</h4>
        <RenderOptions
          options={[
            { code: 0, title: "All" },
            { code: 1, title: "Active" },
            { code: 2, title: "Completed" },
          ]}
          currentRenderCode={currentRenderCode}
          setRenderCode={setRenderCode}
        />
        <button onClick={clearCompletedTodos}>Clear completed todos</button>
      </div>
      <RenderTodos changeTodoState={changeTodoState} currentRenderCode={currentRenderCode} todos={todos} />
      <button className='folder' onClick={() => setModal(true)}>
        <img className='action-img' src={plusSymbol} alt='стрелка вниз' /> <span>Create new todo</span>
      </button>
    </div>
  );
}

export default App;
