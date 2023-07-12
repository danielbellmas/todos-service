import type { Todo } from '../models/todo';
import { TodoDal } from '../dal/todos.dal';

export class TodoBl {
  private todoDal: TodoDal;

  constructor() {
    this.todoDal = new TodoDal();
  }

  async getAll() {
    return this.todoDal.getAll();
  }

  async getById(id: string) {
    return this.todoDal.getById(id);
  }

  async create(todo: Omit<Todo, '_id'>) {
    return this.todoDal.create(todo);
  }

  async updateById(newTodo: Todo) {
    return this.todoDal.updateById(newTodo);
  }

  async delete(id: string) {
    return this.todoDal.delete(id);
  }
}
