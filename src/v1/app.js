import express from 'express';
import cors from 'cors';
import student from './routes/students';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use('/student/', student);
  }
}

export default new App().app;
