import mongoose, { Schema, Document } from 'mongoose';

export interface IFile extends Document {
  title: string;
  path: string;
  url: string;
}

const File = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

File.virtual('url').get(function(this: { path: string }) {
  return `${process.env.URL}/files/${encodeURIComponent(this.path)}`;
});

export default mongoose.model<IFile>('File', File);
