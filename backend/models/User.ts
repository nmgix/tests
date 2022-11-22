import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema({
  email: { type: String, min: 3, max: 30, unique: true, required: true },
  password: { type: String, required: true },
});

export default model<IUser>("User", userSchema);
