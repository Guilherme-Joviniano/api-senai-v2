import express from 'express';
import cors from 'cors';
import {
  resolve,
} from 'path';

import student from './routes/students';
import picture from './routes/picture';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use('/uploads/', express.static(resolve(__dirname, '../', '../', 'uploads')));
  }

  routes() {
    this.app.use('/student/', student);
    this.app.use('/picture/', picture);
  }
}

export default new App().app;
