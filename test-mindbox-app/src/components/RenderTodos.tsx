import React from "react";
import { RenderCodes, Todo } from "../App";

export const RenderTodos: React.FC<{
  changeTodoState: React.Dispatch<any>;
  todos: Todo[];
  currentRenderCode: RenderCodes;
}> = ({ changeTodoState, currentRenderCode, todos }) => {
  var todosToRender =
    currentRenderCode === 1
      ? todos.filter((todo) => todo.completed === false)
      : currentRenderCode === 2
      ? todos.filter((todo) => todo.completed === true)
      : todos;

  return (
    <ul className='folder-wrapper'>
      {todosToRender.map((todo) => (
        // сделано не просто на li а не каждого ребенка ибо input без обработчика кидает варниги
        <li className='folder' key={todo.id}>
          <input type={"checkbox"} checked={todo.completed} onChange={() => changeTodoState(todo)} />
          <span onClick={() => changeTodoState(todo)}>{todo.title}</span>
        </li>
      ))}
    </ul>
  );
};
