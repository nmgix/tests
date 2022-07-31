import { useAction } from "@/store/helpers";
import { ChangeEvent, Children, FormEvent, useContext, useState } from "react";
import styles from "./modal.module.scss";
import { v4 as uuid } from "uuid";
import React from "react";
import { createNotificationTemplate } from "@/store/reducers/notificationsSlice";

export type ModalProps = {
  uuid: string;
  title: string;
  closeForm: (uuid: string) => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ uuid, title, closeForm, children }) => {
  const childrenWithProps = Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement<ModalProps>(child, { closeForm, uuid, key: 0 });
    }
    return child;
  });

  return (
    <li className={styles.modalWrapper} id={uuid}>
      <div className={styles.modalBackground} onClick={() => closeForm(uuid)} />
      <div className={styles.modalContent}>
        <h2 className={styles.title}>{title}</h2>
        {childrenWithProps}
      </div>
    </li>
  );
};

export const CreateTodo: React.FC<Omit<Partial<ModalProps>, "children" | "title"> & { customClasses: any }> = (
  args
) => {
  const { createTodo, createNotification } = useAction();

  type FormData = {
    title: string;
    description: string;
    completed: boolean;
  };

  const [formState, setFormState] = useState<FormData>({
    title: "",
    description: "",
    completed: false,
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!args.uuid || !args.closeForm) {
      return;
    }
    const { title, description } = formState;

    if (!title) {
      createNotification(createNotificationTemplate("Ошибка, нет заголовка задачи", "warning", 3000));
      return;
    }

    if (!description) {
      createNotification(createNotificationTemplate("Ошибка, нет описания задачи", "warning", 3000));
      return;
    }

    createTodo({ ...formState, uuid: uuid() });
    args.closeForm(args.uuid);
    return;
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => {
      return { ...prevState, [e.target.name]: e.target[e.target.name !== "completed" ? "value" : "checked"] };
    });
  };

  return (
    <form onSubmit={onSubmit} className={args.customClasses.formWrapper}>
      <div className={args.customClasses.formInputWrapper}>
        <label htmlFor='title'>Todo's title</label>
        <input name='title' type={"text"} value={formState.title} onChange={onChange} />
      </div>
      <div className={args.customClasses.formInputWrapper}>
        <label htmlFor='description'>Todo's description</label>
        <input name='description' type={"text"} value={formState.description} onChange={onChange} />
      </div>
      <div className={args.customClasses.formInputWrapper}>
        <label htmlFor='completed'>Todo's completed state</label>
        <input name='completed' type={"checkbox"} checked={formState.completed} onChange={onChange} />
      </div>
      <button type='submit' className={args.customClasses.addTodo}>
        <b>+</b>Add new todo
      </button>
    </form>
  );
};
