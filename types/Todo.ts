import React from "react";

export type Todo = {
  uuid: string;
  title: string;
  completed: boolean;
};

export type TodoElementProps = {
  todo: Todo;
  onDelete: (uuid: string) => any;
  onUpdate: (todo: Todo) => any;
};
