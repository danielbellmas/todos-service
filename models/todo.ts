import { Schema, model } from 'mongoose';

export interface Todo {
  _id: string;
  title: string;
  deadline: Date;
}

const todoSchema = new Schema<Todo>({
  title: { type: String, required: true },
  deadline: { type: Date, required: true }
});

export const TodoMongoModel = model<Todo>('Todo', todoSchema);
