import express from 'express';
import cors from 'cors';
import {
  resolve,
} from 'path';

import student from './routes/students';
import picture from './routes/picture';
import course from './routes/course';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use('/v1/uploads/', express.static(resolve(__dirname, '../', '../', 'uploads')));
  }

  routes() {
    this.app.use('/v1/student/', student);
    this.app.use('/v1/course/', course);
    this.app.use('/v1/picture/', picture);
  }
}

export default new App().app;
