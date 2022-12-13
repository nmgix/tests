import React, { useEffect, useRef, useState } from "react";
import { Todo, TodoElementProps } from "../../types/Todo";
import styles from "./_todoElement.module.scss";

const TodoElement: React.FC<TodoElementProps> = ({ todo, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState<boolean>(false);

  return (
    <li className={styles.todoElement}>
      <input
        id={"changeCompletion" + todo.uuid}
        className={styles.changeCompletion}
        type={"checkbox"}
        checked={todo.completed}
        onChange={() => {
          //   setTodoData((data) => ({ ...data, completed: !data.completed }));
          onUpdate(Object.assign(todo, { completed: !todo.completed }));
        }}
      />
      <label className={styles.changeCompletionLabel} htmlFor={"changeCompletion" + todo.uuid} />
      {editing === false ? (
        <>
          <span className={styles.todoTitle}>{todo.title}</span>
          <button className={styles.destroy} onClick={() => onDelete(todo.uuid)}></button>
        </>
      ) : (
        <input
          value={todo.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            // setTodoData((data) => ({ ...data, title: e.target.value }));
            onUpdate(Object.assign(todo, { title: e.target.value }));
          }}
        />
      )}
    </li>
  );
};

export default TodoElement;
