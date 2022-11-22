import { Schema, model, Document, Types } from "mongoose";

export interface ITodo extends Document {
  title: string;
  description: string;
  completed: boolean;
  activeUntil: Date; //string
  attachments: Types.DocumentArray<string>;
}

const todoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, required: true },
  activeUntil: { type: Date, required: true },
  attachments: {
    type: [String],
  },
});

export default model<ITodo>("Todo", todoSchema);
