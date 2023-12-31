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

  async create(todo: Omit<Todo, '_id'>) {
    return this.todoDal.create(todo);
  }

  async update(newTodo: Todo) {
    return this.todoDal.update(newTodo);
  }

  async delete(id: string) {
    return this.todoDal.delete(id);
  }
}
