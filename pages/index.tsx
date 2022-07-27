import type { NextPage } from "next";
import styles from "@/styles/pages/Home.module.scss";
import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { useAction, useAppSelector } from "@/store/helpers";
import { TodoList } from "@/components/Todo/TodoList/TodoList";

const Home: NextPage = () => {
  const todosState = useAppSelector((state) => state.todos);

  const { createTodo, changeFilter, setTodos } = useAction();

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
      setTodos(JSON.parse(localTodos!));
    } catch (e) {}
  }, []);

  // желательно переписать на сагу
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todosState.todos));
  }, [todosState.todos]);

  return (
    <Fragment>
      <Head>
        <title>Nginx's todo-app</title>
      </Head>
      <div className={styles.container}>
        <h1 className={styles.header}>Nginx's todos</h1>
        <ul className={styles.status}>
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
        {windowReady === true ? <TodoList /> : <p>Todos loading</p>}
      </div>
    </Fragment>
  );
};

export default Home;
