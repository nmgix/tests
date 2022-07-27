import { useAction, useAppSelector } from "@/store/helpers";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { MoveCard, TodoElement, TodoElementProps } from "../TodoElement/TodoElement";
import styles from "./todoList.module.scss";

// export type TodoList = {
//   todos: TodoElementProps[];
// };

export const TodoList = () => {
  // const [items, setItems] = useState<TodoElementProps[]>(todos);
  // useEffect(() => {
  //   setItems(todos);
  // }, [todos]);

  const { setTodos, filterTodos } = useAction();
  const todosState = useAppSelector((state) => state.todos);

  useEffect(() => {
    // чтобы не работал пререндер ноды
    if (typeof window !== "undefined") {
      filterTodos(null);
    }
  }, [typeof window]);

  const moveCardHandler: MoveCard = (dragIndex, hoverIndex) => {
    const dragItem = todosState.filteredTodos[dragIndex];

    if (dragItem) {
      const copiedStateArray = [...todosState.filteredTodos];
      const prevItem = copiedStateArray.splice(hoverIndex, 1, dragItem);
      copiedStateArray.splice(dragIndex, 1, prevItem[0]);

      setTodos({ toRealTodos: false, todos: copiedStateArray });
    }
  };

  if (todosState.filteredTodos.length <= 0) {
    return <p>Loading</p>;
  }

  return (
    <ul className={styles.todoList}>
      <DndProvider backend={window.innerWidth < 768 ? TouchBackend : HTML5Backend}>
        {todosState.filteredTodos.map((todo, i) => {
          return <TodoElement {...todo} index={i} moveCardHandler={moveCardHandler} key={todo.uuid} />;
        })}
      </DndProvider>
    </ul>
  );
};
