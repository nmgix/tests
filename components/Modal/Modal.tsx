import { useAction } from "@/store/helpers";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./modal.module.scss";
import { v4 as uuid } from "uuid";
import customModalStyles from "../../styles/pages/Home.module.scss";

export type ModalProps = {
  uuid: string;
  title: string;
  closeForm: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ uuid, title, closeForm, children }) => {
  return (
    <li className={styles.modalWrapper} id={uuid}>
      <div className={styles.modalBackground} onClick={closeForm} />
      <div className={styles.modalContent}>
        <h2 className={styles.title}>{title}</h2>
        {children}
      </div>
    </li>
  );
};

export const CreateTodoModal: React.FC<ModalProps & { customClasses: any }> = (args) => {
  const { createTodo } = useAction();

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
    const { title, description } = formState;

    if (!title) {
      console.log("error! title field is empty");
      // вызов redux метода error...
      return;
    }

    if (!description) {
      console.log("error! description field is empty");
      // вызов redux метода error...
      return;
    }

    createTodo({ ...formState, uuid: uuid() });
    args.closeForm();
    return;
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => {
      console.log(e.target.value);
      return { ...prevState, [e.target.name]: e.target[e.target.name !== "completed" ? "value" : "checked"] };
    });
  };

  const content = (
    <form onSubmit={onSubmit}>
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

  return (
    <Modal uuid={args.uuid} title={args.title} closeForm={args.closeForm}>
      {content}
    </Modal>
  );
};
