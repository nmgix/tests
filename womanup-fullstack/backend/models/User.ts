import { Schema, model, Document, Types } from "mongoose";
import Todo, { ITodo } from "./Todo";

export interface IUser extends Document {
  email: string;
  password: string;
  todos: Types.DocumentArray<ITodo>;
}

const userSchema = new Schema({
  email: { type: String, min: 3, max: 30, unique: true, required: true },
  password: { type: String, required: true },
  todos: {
    type: [Todo.schema],
  },
});

export default model<IUser>("User", userSchema);
