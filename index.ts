import express from 'express';
import type { ConnectOptions } from 'mongoose';
import mongoose from 'mongoose';
import todosRoutes from './routes/todos.routes';
import config from './config';

const app = express();

app.use(express.json());

app.use('/todos', todosRoutes);

const { port, database } = config;

(async () => {
  try {
    await mongoose.connect(database.url, database.options as ConnectOptions);
    console.log('Connected to MongoDB');

    app.listen(port, () => {
      console.log(`Server listening on port ${port} 🚀`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
})();
