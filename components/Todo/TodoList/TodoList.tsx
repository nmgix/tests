import { useAction, useAppSelector } from "@/store/helpers";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { MoveCard, TodoElement, TodoElementProps } from "../TodoElement/TodoElement";
import styles from "./todoList.module.scss";
import { handleFilter } from "@/store/reducers/todosSlice";

export const TodoList = () => {
  const { setTodos } = useAction();
  const todosState = useAppSelector((state) => state.todos);

  const moveCardHandler: MoveCard = (dragIndex, hoverIndex) => {
    const dragItem = todosState.todos[dragIndex];

    if (dragItem) {
      const copiedStateArray = [...todosState.todos];
      const prevItem = copiedStateArray.splice(hoverIndex, 1, dragItem);
      copiedStateArray.splice(dragIndex, 1, prevItem[0]);

      setTodos(copiedStateArray);
    }
  };

  return (
    <ul className={styles.todoList}>
      <DndProvider backend={window.innerWidth < 768 ? TouchBackend : HTML5Backend}>
        {todosState.todos &&
          todosState.todos
            .filter((todo) => handleFilter(todo, todosState.currentFilter))
            .map((todo, i) => {
              return <TodoElement {...todo} index={i} moveCardHandler={moveCardHandler} key={todo.uuid} />;
            })}
      </DndProvider>
    </ul>
  );
};
