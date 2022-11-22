import { Schema, model, Document } from "mongoose";
import { IAttachment } from "./Attachment";

export interface ITodo extends Document {
  title: string;
  description: string;
  completed: boolean;
  activeUntil: Date; //string
  attachments: IAttachment[];
}

const todoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, required: true },
  activeUntil: { type: Date, required: true },
  attachments: [{ type: Schema.Types.ObjectId, ref: "Attachment" }],
});

export default model<ITodo>("Todo", todoSchema);
