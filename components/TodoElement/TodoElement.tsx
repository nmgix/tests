import React, { memo, useEffect, useRef, useState } from "react";
import { Keycodes } from "../../types/Keycodes";
import { TodoElementProps } from "../../types/Todo";
import styles from "./_todoElement.module.scss";

const TodoElement: React.FC<TodoElementProps> = memo(
  ({ todo, onUpdate, onDelete, onEdit, editing, onCancel }) => {
    const [newTitle, setNewTitle] = useState<string>(todo.title);
    useEffect(() => {
      setNewTitle(todo.title);
    }, [todo]);

    const inputRef = useRef<HTMLInputElement>(null);
    const inputStyles: React.CSSProperties | undefined = editing === false ? { display: "none" } : undefined;

    // функции компонентов
    const onBlur = () => {
      onUpdate(Object.assign(todo, { title: newTitle }));
      onCancel();
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
      if (e.code === Keycodes.escapeKey) {
        setNewTitle(todo.title);
        onCancel();
      } else if (e.code === Keycodes.enterKey) {
        if (newTitle.trim().length > 0) {
          onUpdate(Object.assign(todo, { title: newTitle }));
        } else {
          onCancel();
        }
      }
    };

    const onEditSelect = () => {
      {
        if (!inputRef.current) {
          return;
        }
        onEdit(todo.uuid);
        inputRef.current.style.display = "block";
        inputRef.current.focus();
      }
    };

    const onTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewTitle(e.target.value);
    };

    const onCompletionChange = () => {
      onUpdate(Object.assign({}, todo, { completed: !todo.completed }));
    };

    const deleteTodo = () => onDelete(todo.uuid);

    return (
      <li className={styles.todoElement}>
        <input
          id={"changeCompletion" + todo.uuid}
          className={styles.changeCompletion}
          type={"checkbox"}
          checked={todo.completed}
          onChange={onCompletionChange}
        />
        <label className={styles.changeCompletionLabel} htmlFor={"changeCompletion" + todo.uuid} />
        <span className={styles.todoTitle} onDoubleClick={onEditSelect}>
          {todo.title}
        </span>
        <button className={styles.destroy} onClick={deleteTodo}></button>
        <input
          value={newTitle}
          onChange={onTitleInputChange}
          className={styles.editTitle}
          style={inputStyles}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          ref={inputRef}
        />
      </li>
    );
  },
  (prev, next) => {
    return (
      prev.todo.completed === next.todo.completed &&
      prev.todo.title === next.todo.title &&
      prev.editing === next.editing
    );
  }
);

export default TodoElement;
