import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { MoveCard, TodoElement, TodoElementProps } from "../TodoElement/TodoElement";
import styles from "./todoList.module.scss";

export type TodoList = {
  todos: TodoElementProps[];
};

export const TodoList = ({ todos }: TodoList) => {
  const [items, setItems] = useState<TodoElementProps[]>(todos);

  const moveCardHandler: MoveCard = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex];

    if (dragItem) {
      setItems((prevState) => {
        const copiedStateArray = [...prevState];

        const prevItem = copiedStateArray.splice(hoverIndex, 1, dragItem);
        copiedStateArray.splice(dragIndex, 1, prevItem[0]);

        return copiedStateArray;
      });
    }
  };

  return (
    <ul className={styles.todoList}>
      <DndProvider backend={window.innerWidth < 768 ? TouchBackend : HTML5Backend}>
        {items.map((todo, i) => (
          <TodoElement {...todo} index={i} moveCardHandler={moveCardHandler} setState={setItems} key={todo.id} />
        ))}
      </DndProvider>
    </ul>
  );
};
