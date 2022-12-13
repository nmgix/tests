import Image from "next/image";
import { useEffect, useState } from "react";
import { Todo } from "../../types/Todo";
import styles from "./_todoList.module.scss";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>();

  useEffect(() => {
    const JSONTodos = localStorage.getItem("todos");
    if (!JSONTodos) {
      return setTodos([]);
    }
    return setTodos(JSON.parse(JSONTodos) as Todo[]);
  }, []);

  return todos !== undefined ? (
    <div className={styles.todoList}>
      <header>
        <input id='checkAll' className={styles.checkAll} type={"checkbox"} />
        <label htmlFor='checkAll' className={styles.checkAllLabel} />
        <input className={styles.newTodo} placeholder='What needs to be done?' />
      </header>
      <ul>{/* todo list */}</ul>
      <div>{/* controls */}</div>
    </div>
  ) : (
    <></>
  );
};

export default TodoList;
