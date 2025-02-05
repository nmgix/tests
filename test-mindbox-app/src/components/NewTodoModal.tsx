import React, { useState } from "react";
import { NewTodo } from "../App";

export const NewTodoModal: React.FC<{
  setModal: React.Dispatch<any>;
  addTodo: (e: React.FormEvent<HTMLFormElement>, todo: NewTodo) => void;
}> = ({ setModal, addTodo }) => {
  const [data, setData] = useState<NewTodo>({ title: "", completed: false });
  const [error, setError] = useState<boolean>(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.title.length > 0) {
      setError(false);
      return addTodo(e, data);
    } else {
      return setError(true);
    }
  };

  return (
    <div className='newTodoModal-wrapper'>
      <div className='background' onClick={() => setModal(false)} />
      <div className='newTodoModal'>
        <h2>Add new Todo</h2>
        <form onSubmit={handleSubmit}>
          <div className='vertical'>
            <label htmlFor='title'>Todo title</label>
            <input
              name='title'
              placeholder='todo name'
              type={"text"}
              value={data.title}
              autoFocus
              onChange={(e) =>
                setData((state) => {
                  return { ...state, title: e.target.value };
                })
              }
            />
          </div>
          <div className='horizontal'>
            <label htmlFor='checkbox'>Completed</label>
            <input
              name='checkbox'
              type={"checkbox"}
              checked={data.completed}
              onChange={() =>
                setData((state) => {
                  return { ...state, completed: !state.completed };
                })
              }
            />
          </div>
          <button type='submit'>Create todo</button>
        </form>
        {error ? <p className='error'>Error occured</p> : <></>}
      </div>
    </div>
  );
};
