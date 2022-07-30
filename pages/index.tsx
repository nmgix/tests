import type { NextPage } from "next";
import styles from "@/styles/pages/home.module.scss";
import { Fragment, useContext, useEffect, useState } from "react";
import Head from "next/head";
import { useAction, useAppSelector } from "@/store/helpers";
import { TodoList } from "@/components/Todo/TodoList/TodoList";
import { ModalContext } from "@/components/Modal/ModalList/ModalList";
import { CreateTodo } from "@/components/Modal/ModalElement/Modal";

import customModalStyles from "@/components/Modal/ModalElement/createTodo.module.scss";

const Home: NextPage = () => {
  const todosState = useAppSelector((state) => state.todos);

  const { changeFilter, setTodos, deleteCompletedTodos } = useAction();

  const [windowReady, setWindowReady] = useState<boolean>(false);
  useEffect(() => {
    // чтобы не работал пререндер ноды
    if (typeof window !== "undefined") {
      setWindowReady(true);
    }
  }, [typeof window]);

  // желательно переписать на сагу
  useEffect(() => {
    try {
      let localTodos = localStorage.getItem("todos");
      let parsedTodos = JSON.parse(localTodos!);
      if (parsedTodos) {
        setTodos(parsedTodos);
      }
    } catch (e) {}
  }, []);

  // желательно переписать на сагу
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todosState.todos === null ? [] : todosState.todos));
  }, [todosState.todos]);

  const { createModal } = useContext(ModalContext);

  const createNewTodoModal = () => {
    // может вернусь к CreateTodoModal, но тогда CreateTodo в контексте будет необходимо отрефакторить
    createModal({ children: <CreateTodo customClasses={customModalStyles} />, title: "Create new Todo" });
  };

  return (
    <Fragment>
      <Head>
        <title>Nginx's todo-app</title>
      </Head>
      <div className={styles.container}>
        <h1 className={styles.header}>Nginx's todos</h1>
        {windowReady && todosState.todos && todosState.todos.length > 0 ? (
          <div className={styles.status}>
            <ul>
              <li>
                <button onClick={() => changeFilter(1)} className={todosState.currentFilter === 1 ? styles.active : ""}>
                  {todosState.todos.reduce((acc, curr) => (curr.completed === true ? ++acc : acc), 0)} completed
                </button>
              </li>
              <li>
                <button onClick={() => changeFilter(2)} className={todosState.currentFilter === 2 ? styles.active : ""}>
                  {todosState.todos.reduce((acc, curr) => (curr.completed === false ? ++acc : acc), 0)} active
                </button>
              </li>
              <li>
                <button
                  onClick={() => changeFilter(null)}
                  className={todosState.currentFilter === null ? styles.active : ""}>
                  {todosState.todos.length} total
                </button>
              </li>
            </ul>
            <ul>
              <li>
                <button className={styles.menuButton} onClick={() => deleteCompletedTodos()}>
                  <b>x</b>Delete completed todos
                </button>
              </li>
              <li>
                <button className={styles.addTodo} onClick={() => createNewTodoModal()}>
                  <b>+</b>Add new todo
                </button>
              </li>
              <li>
                <button className={styles.menuButton} onClick={() => setTodos([])}>
                  <b>x</b>Delete all todos
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <></>
        )}
        {windowReady === true ? <TodoList /> : <p>Todos loading</p>}
        <button className={styles.addTodo} onClick={() => createNewTodoModal()}>
          <b>+</b>Add new todo
        </button>
      </div>
    </Fragment>
  );
};

export default Home;
