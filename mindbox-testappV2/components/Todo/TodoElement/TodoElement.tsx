import { useRef } from "react";
import styles from "./todoElement.module.scss";
import { useDrag, useDrop } from "react-dnd";
import { useAction } from "@/store/helpers";

export type TodoElementProps = {
  uuid: string;
  title: string;
  description: string;
  completed: boolean;
};

export type MoveCard = (dragIndex: number, hoverIndex: number) => TodoElementProps[] | void;

export type DndType = {
  index: number;
  moveCardHandler: MoveCard;
};

export const TodoElement = ({
  index,
  moveCardHandler,
  uuid,
  title,
  completed,
  description,
}: TodoElementProps & DndType) => {
  const ref = useRef<HTMLDivElement>(null);
  const { updateTodo } = useAction();

  // @ React-DnD docs
  const [, drop] = useDrop({
    accept: "todo",
    hover(item: TodoElementProps & DndType, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCardHandler(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: "todo",
    item: { index, uuid, type: "todo" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const trunicateString = (text: string, length: number) => {
    let currentText = text;
    if (currentText.length > length) {
      currentText = `${currentText.slice(0, length)}...`;
    }

    return currentText;
  };

  drag(drop(ref));

  return (
    <li className={styles.todoElement} ref={dragPreview} style={{ transform: isDragging ? "scale(1.05)" : "scale(1)" }}>
      <div className={styles.dragZone} ref={ref} id={uuid}>
        <div />
        <div />
        <div />
      </div>
      <div className={styles.todoContent}>
        <header>
          <h3 className={styles.title}>{trunicateString(title, 20)}</h3>
          <input type={"checkbox"} checked={completed} onChange={() => updateTodo({ uuid, completed: !completed })} />
        </header>
        {description ? <main>{trunicateString(description, 140)}</main> : <></>}
      </div>
    </li>
  );
};
