import { Todo } from '../models/todo';

export const todosMock: Todo[] = [
  {
    _id: '1',
    title: 'Todo 1',
    deadline: new Date('2023-07-20')
  },
  {
    _id: '2',
    title: 'Todo 2',
    deadline: new Date('2023-07-19')
  },
  {
    _id: '3',
    title: 'Todo 3',
    deadline: new Date()
  }
];
