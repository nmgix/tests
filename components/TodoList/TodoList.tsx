import React, { useEffect, useState } from "react";
import { Keycodes } from "../../types/Keycodes";
import { Todo } from "../../types/Todo";
import styles, { newTodo } from "./_todoList.module.scss";
import { v4 as uuid } from "uuid";
import TodoElement from "../TodoElement/TodoElement";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>();
  // состояние, получение при певром рендере из localStorage
  useEffect(() => {
    const JSONTodos = localStorage.getItem("react-nmgix-todos");
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

  // шеврон выделения всех заданий
  const completedTodos = !todos
    ? 0
    : todos.reduce(function (accum, todo) {
        return !todo.completed ? accum : accum + 1;
      }, 0);
  const [activeSelection, setActiveSelection] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    // чтобы у существующих заданий не менялось состояние выполнения при первом рендере
    if (activeSelection !== undefined) {
      setTodos((prevTodos) =>
        !prevTodos
          ? []
          : prevTodos.map((todo) => {
              const newTodo = Object.assign({}, todo, {
                completed: todos && completedTodos === todos.length ? false : true,
              });
              return newTodo;
            })
      );
    }
  }, [activeSelection]);

  // контроль ввода нового задания
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const onNewTodoUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(() => e.target.value);
  };
  const handleNewTodoKeyDown = (e: React.KeyboardEvent) => {
    if (e.code !== Keycodes.enterKey || newTodoTitle.length === 0) {
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

  // состояние редактирования
  const [editing, setEditing] = useState<string | undefined>(undefined);
  const onEdit = (uuid: string) => {
    setEditing(uuid);
  };
  const onCancel = () => {
    setEditing(undefined);
  };

  // функции компонентов

  const clearCompleted = () => setTodos((todos) => (!todos ? [] : todos.filter((todo) => todo.completed !== true)));
  const changeAllSelection = () => setActiveSelection((prevState) => !prevState);

  // компоненты
  const todoListComponent = !todos ? (
    <></>
  ) : (
    todos
      .filter((todo) => (selectedFilter === undefined ? todo : todo[selectedFilter.field] === selectedFilter.value))
      .map((todo) => (
        <TodoElement
          todo={todo}
          onDelete={onDelete}
          onUpdate={onUpdate}
          key={todo.uuid}
          editing={editing === todo.uuid}
          onCancel={onCancel}
          onEdit={onEdit}
        />
      ))
  );

  const completedTodosComponent =
    completedTodos > 0 ? (
      <button className={styles.clearCompleted} onClick={clearCompleted}>
        Clear completed
      </button>
    ) : (
      <></>
    );

  const activeFooter =
    todos && todos.length > 0 ? (
      <footer>
        <span>{todos.length - completedTodos} items left</span>
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
        {completedTodosComponent}
      </footer>
    ) : (
      <></>
    );

  const checkAllComponent =
    todos && todos.length > 0 ? (
      <>
        <input
          id='checkAll'
          className={styles.checkAll}
          type={"checkbox"}
          checked={completedTodos === todos.length}
          onChange={changeAllSelection}
        />
        <label htmlFor='checkAll' className={styles.checkAllLabel} />
      </>
    ) : (
      <></>
    );

  return todos !== undefined ? (
    <div className={styles.todoList}>
      <header>
        {checkAllComponent}
        <input
          className={styles.newTodo}
          placeholder='What needs to be done?'
          value={newTodoTitle}
          onChange={onNewTodoUpdate}
          onKeyDown={handleNewTodoKeyDown}
          autoFocus={true}
        />
      </header>
      <ul className={styles.list}>{todoListComponent}</ul>
      {activeFooter}
    </div>
  ) : (
    <></>
  );
};

export default TodoList;
