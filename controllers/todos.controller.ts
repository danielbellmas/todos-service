import type { Request, Response } from 'express';
import { TodoBl } from '../bl/todos.bl';

export class TodoController {
  private todoBl: TodoBl;

  constructor() {
    this.todoBl = new TodoBl();
  }

  async getAllTodos(req: Request, res: Response): Promise<void> {
    try {
      const todos = await this.todoBl.getAll();
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createTodo(req: Request, res: Response): Promise<void> {
    try {
      const { title, deadline } = req.body;

      const todo = await this.todoBl.create({ title, deadline });

      res.status(201).json(todo);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateTodo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, deadline } = req.body;

      const updatedTodo = await this.todoBl.update({ _id: id, title, deadline });

      if (!updatedTodo) {
        res.status(404).json({ error: 'Todo not found' });
      } else {
        res.json(updatedTodo);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteTodo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedTodo = await this.todoBl.delete(id);

      if (!deletedTodo) {
        res.status(404).json({ error: 'Todo not found' });
      } else {
        res.json(deletedTodo);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
