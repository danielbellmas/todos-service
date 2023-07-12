import express from 'express';
import type { ConnectOptions } from 'mongoose';
import mongoose from 'mongoose';
import config from './config';

const { database } = config;

(async () => {
  try {
    await mongoose.connect(database.url, database.options as ConnectOptions);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
})();
