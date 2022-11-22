import { Schema, model, Document } from "mongoose";
import { ITodo } from "./Todo";

export interface IUser extends Document {
  email: string;
  password: string;
  todos: ITodo[];
}

const userSchema = new Schema({
  email: { type: String, min: 3, max: 30, unique: true, required: true },
  password: { type: String, required: true },
  todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
});

export default model<IUser>("User", userSchema);
