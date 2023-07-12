import type { Todo } from '../models/todo';
import { TodoMongoModel } from '../models/todo';

export class TodoDal {
  async getAll() {
    return TodoMongoModel.find();
  }

  async create(todo: Omit<Todo, '_id'>) {
    return TodoMongoModel.create(todo);
  }

  async updateById({ _id, title, deadline }: Todo) {
    return TodoMongoModel.findByIdAndUpdate(_id, { title, deadline }, { new: true });
  }

  async delete(id: string) {
    return TodoMongoModel.findByIdAndDelete(id);
  }
}
