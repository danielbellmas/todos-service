import { config } from 'dotenv';

config();

const { PORT, DATABASE_URL } = process.env;

export default {
  port: PORT || 3001,
  database: {
    url: DATABASE_URL || 'mongodb://127.0.0.1:27017/todos',
    options: { useNewUrlParser: true, useUnifiedTopology: true }
  }
};
