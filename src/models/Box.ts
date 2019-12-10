import mongoose, { Schema, Document } from 'mongoose';
import { IFile } from './File';

export interface IBox extends Document {
  title: string;
  files: [IFile['_id']];
}

const Box: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBox>('Box', Box);
