import { memo, useState } from "react";
import styles from "./todoElement.module.scss";

export type TodoElementProps = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

function TodoElement({ title, completed, description }: TodoElementProps) {
  const [checked, setChecked] = useState<boolean>(completed);
  const changeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    // тут будет вызов redux

    setChecked((prevChecked) => !prevChecked);
  };

  const trunicateString = (text: string, length: number) => {
    let currentText = text;
    if (currentText.length > length) {
      currentText = `${currentText.slice(0, length)}...`;
    }

    return currentText;
  };

  return (
    <li className={styles.todoElement}>
      <div className={styles.dragZone}>
        <div />
        <div />
        <div />
        <div />
      </div>
      <div className={styles.todoContent}>
        <header>
          <h3 className={styles.title}>{title}</h3>
          <input type={"checkbox"} checked={checked} onChange={changeChecked} data-testid='my-checkbox' />
        </header>
        {description ? <main>{trunicateString(description, 140)}</main> : <></>}
      </div>
    </li>
  );
}

const MemoizedTodoElement = memo(TodoElement, (prevState, nextState) => prevState.completed === nextState.completed);

export default MemoizedTodoElement;
