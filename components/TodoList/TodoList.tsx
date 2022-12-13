import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Keykodes } from "../../types/Keycodes";
import { Todo } from "../../types/Todo";
import styles, { newTodo } from "./_todoList.module.scss";
import { v4 as uuid } from "uuid";
import TodoElement from "../TodoElement/TodoElement";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>();
  // состояние, получение при певром рендере из localStorage
  useEffect(() => {
    const JSONTodos = localStorage.getItem("react-nmgix-todos");
    console.log(JSONTodos);
    if (!JSONTodos || JSONTodos == "undefined") {
      return setTodos([]);
    }
    const parsedTodos = JSON.parse(JSONTodos);
    if (Array.isArray(parsedTodos)) {
      return setTodos(parsedTodos);
    } else {
      return setTodos([]);
    }
  }, []);
  useEffect(() => {
    if (todos !== undefined) {
      localStorage.setItem("react-nmgix-todos", JSON.stringify(todos));
    }
  }, [todos]);

  // контроль ввода нового задания
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const onNewTodoUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(() => e.target.value);
  };
  const handleNewTodoKeyDown = (e: React.KeyboardEvent) => {
    if (e.code !== Keykodes.enterKey) {
      return;
    }
    e.preventDefault();

    const newTodo: Todo = {
      title: newTodoTitle,
      uuid: uuid(),
      completed: false,
    };
    setTodos((prevTodos) => [...(prevTodos || []), newTodo]);
    setNewTodoTitle("");
    return;
  };

  // действия с заданием в списке
  const onDelete = (uuid: string) => {
    setTodos((prevTodos) => (!prevTodos ? [] : prevTodos.filter((todo) => todo.uuid !== uuid)));
  };
  const onUpdate = (updatedTodo: Todo) => {
    setTodos((prevTodos) =>
      !prevTodos
        ? []
        : prevTodos.map((todo) => (todo.uuid === updatedTodo.uuid ? Object.assign({}, updatedTodo) : todo))
    );
  };

  // фильтр
  const [selectedFilter, setSelectedFilter] = useState<
    { field: keyof Pick<Todo, "completed">; value: Todo["completed"] } | undefined
  >(undefined);

  return todos !== undefined ? (
    <div className={styles.todoList}>
      <header>
        {todos.length > 0 && (
          <>
            <input id='checkAll' className={styles.checkAll} type={"checkbox"} />
            <label htmlFor='checkAll' className={styles.checkAllLabel} />
          </>
        )}
        <input
          className={styles.newTodo}
          placeholder='What needs to be done?'
          value={newTodoTitle}
          onChange={onNewTodoUpdate}
          onKeyDown={handleNewTodoKeyDown}
          autoFocus={true}
        />
      </header>
      <ul className={styles.list}>
        {todos
          .filter((todo) => (selectedFilter === undefined ? todo : todo[selectedFilter.field] === selectedFilter.value))
          .map((todo) => (
            <TodoElement todo={todo} onDelete={onDelete} onUpdate={onUpdate} key={todo.uuid} />
          ))}
      </ul>
      <footer>
        <span>{todos.length} items left</span>
        <div className={styles.filters}>
          <button
            className={selectedFilter === undefined ? styles.selected : ""}
            onClick={() => setSelectedFilter(undefined)}>
            All
          </button>
          <button
            className={selectedFilter && selectedFilter.value === false ? styles.selected : ""}
            onClick={() => setSelectedFilter({ field: "completed", value: false })}>
            Active
          </button>
          <button
            className={selectedFilter && selectedFilter.value === true ? styles.selected : ""}
            onClick={() => setSelectedFilter({ field: "completed", value: true })}>
            Completed
          </button>
        </div>
      </footer>
    </div>
  ) : (
    <></>
  );
};

export default TodoList;
