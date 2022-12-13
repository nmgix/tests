import { TodoElementProps } from "../../types/Todo";

const TodoElement: React.FC<TodoElementProps> = ({ todo, onUpdate, onDelete }) => {
  return <li>{todo.title}</li>;
};

export default TodoElement;
