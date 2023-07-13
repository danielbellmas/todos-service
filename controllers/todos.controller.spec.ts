import type { Request, Response } from 'express';
import { TodoController } from './todos.controller';
import { TodoBl } from '../bl/todos.bl';
import { todosMock } from '../mocks/todosMock';

interface Params {
  id: string;
}

interface Body {
  title: string;
  deadline: Date;
}

interface CreateRequestMock {
  params?: Params;
  body?: Body;
}

const createResponseMock = (): Partial<Response> => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
});

const createRequestMock = ({ params, body }: CreateRequestMock = {}) =>
  ({
    params,
    body
  } as Partial<Request>);

describe('TodoController', () => {
  let todoController: TodoController;

  beforeEach(() => {
    todoController = new TodoController();
  });

  describe('getAllTodos', () => {
    it('should return all todos', async () => {
      const mockResponse = createResponseMock();
      const mockRequest = createRequestMock();

      const getAllSpy = jest.spyOn(TodoBl.prototype, 'getAll');
      getAllSpy.mockResolvedValueOnce(todosMock);

      await todoController.getAllTodos(mockRequest as Request, mockResponse as Response);

      expect(getAllSpy).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(todosMock);
    });

    it('should handle errors', async () => {
      const mockResponse = createResponseMock();
      const mockRequest = createRequestMock();

      const getAllSpy = jest.spyOn(TodoBl.prototype, 'getAll');
      getAllSpy.mockRejectedValueOnce(new Error('Database connection failed'));

      await todoController.getAllTodos(mockRequest as Request, mockResponse as Response);

      expect(getAllSpy).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('createTodo', () => {
    it('should create a new todo', async () => {
      const mockResponse = createResponseMock();
      const mockRequest = createRequestMock({
        body: {
          title: 'Todo 1',
          deadline: new Date('2023-07-20')
        }
      });

      const randomId = Math.random().toString(36).substring(7);
      const mockCreatedTodo = { _id: randomId, ...mockRequest.body };

      const createSpy = jest.spyOn(TodoBl.prototype, 'create');
      createSpy.mockResolvedValueOnce(mockCreatedTodo);

      await todoController.createTodo(mockRequest as Request, mockResponse as Response);

      expect(createSpy).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCreatedTodo);
    });

    it('should handle errors', async () => {
      const mockResponse = createResponseMock();
      const mockRequest = createRequestMock({
        body: {
          title: 'Todo 1',
          deadline: new Date('2023-07-20')
        }
      });

      const createSpy = jest.spyOn(TodoBl.prototype, 'create');
      createSpy.mockRejectedValueOnce(new Error('Database connection failed'));

      await todoController.createTodo(mockRequest as Request, mockResponse as Response);

      expect(createSpy).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('updateTodo', () => {
    it('should update a todo', async () => {
      const currUpdatedTodoMock = todosMock[0];
      const mockResponse = createResponseMock();
      const mockRequest = createRequestMock({
        params: { id: currUpdatedTodoMock._id },
        body: {
          title: 'Todo 11',
          deadline: new Date('2023-07-20')
        }
      });

      const updatedTodoMock = { ...currUpdatedTodoMock, ...mockRequest.body };

      const updateByIdSpy = jest.spyOn(TodoBl.prototype, 'update');
      updateByIdSpy.mockResolvedValueOnce(updatedTodoMock);

      await todoController.updateTodo(mockRequest as Request, mockResponse as Response);

      expect(updateByIdSpy).toHaveBeenCalledWith({ _id: mockRequest.params!.id, ...mockRequest.body });
      expect(mockResponse.json).toHaveBeenCalledWith(updatedTodoMock);
    });

    it('should error when the todo is not found', async () => {
      const nonExistingId = 'non-existing-id';
      const mockResponse = createResponseMock();
      const mockRequest = createRequestMock({
        params: { id: nonExistingId },
        body: {
          title: 'Todo 11',
          deadline: new Date('2023-07-20')
        }
      });

      const updateSpy = jest.spyOn(TodoBl.prototype, 'update');
      updateSpy.mockResolvedValueOnce(null);

      await todoController.updateTodo(mockRequest as Request, mockResponse as Response);

      expect(updateSpy).toHaveBeenCalledWith({ _id: mockRequest.params!.id, ...mockRequest.body });
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Todo not found' });
    });

    it('should handle errors', async () => {
      const mockResponse = createResponseMock();
      const mockRequest = createRequestMock({
        params: { id: todosMock[0]._id },
        body: {
          title: 'Todo 1',
          deadline: new Date('2023-07-20')
        }
      });

      const updateSpy = jest.spyOn(TodoBl.prototype, 'update');
      updateSpy.mockRejectedValueOnce(new Error('Database connection failed'));

      await todoController.updateTodo(mockRequest as Request, mockResponse as Response);

      expect(updateSpy).toHaveBeenCalledWith({ _id: mockRequest.params!.id, ...mockRequest.body });
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo', async () => {
      const mockResponse = createResponseMock();
      const mockRequest = createRequestMock({ params: { id: todosMock[0]._id } });

      const deleteByIdSpy = jest.spyOn(TodoBl.prototype, 'delete');
      deleteByIdSpy.mockResolvedValueOnce(todosMock[0]);

      await todoController.deleteTodo(mockRequest as Request, mockResponse as Response);

      expect(deleteByIdSpy).toHaveBeenCalledWith(mockRequest.params!.id);
      expect(mockResponse.json).toHaveBeenCalledWith(todosMock[0]);
    });

    it('should error when the todo is not found', async () => {
      const nonExistingId = 'non-existing-id';
      const mockResponse = createResponseMock();
      const mockRequest = createRequestMock({ params: { id: nonExistingId } });

      const deleteSpy = jest.spyOn(TodoBl.prototype, 'delete');
      deleteSpy.mockResolvedValueOnce(null);

      await todoController.deleteTodo(mockRequest as Request, mockResponse as Response);

      expect(deleteSpy).toHaveBeenCalledWith(mockRequest.params!.id);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Todo not found' });
    });

    it('should handle errors', async () => {
      const mockResponse = createResponseMock();
      const mockRequest = createRequestMock({ params: { id: todosMock[0]._id } });

      const deleteSpy = jest.spyOn(TodoBl.prototype, 'delete');
      deleteSpy.mockRejectedValueOnce(new Error('Database connection failed'));

      await todoController.deleteTodo(mockRequest as Request, mockResponse as Response);

      expect(deleteSpy).toHaveBeenCalledWith(mockRequest.params!.id);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });
});
