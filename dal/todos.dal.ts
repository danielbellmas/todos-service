import type { Todo } from '../models/todo';
import { TodoMongoModel } from '../models/todo';

export class TodoDal {
  async getAll(): Promise<Todo[]> {
    return TodoMongoModel.find();
  }

  async create(todo: Omit<Todo, '_id'>): Promise<Todo> {
    return TodoMongoModel.create(todo);
  }

  async update({ _id, title, deadline }: Todo): Promise<Todo | null> {
    return TodoMongoModel.findByIdAndUpdate(_id, { title, deadline }, { new: true });
  }

  async delete(id: string): Promise<Todo | null> {
    return TodoMongoModel.findByIdAndDelete(id);
  }
}
