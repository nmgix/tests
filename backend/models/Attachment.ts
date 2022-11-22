import { Schema, model, Document } from "mongoose";

export interface IAttachment extends Document {
  filename: string;
}

const attachmentSchema = new Schema({
  filename: { type: String, required: true },
});

export default model<IAttachment>("Attachment", attachmentSchema);
