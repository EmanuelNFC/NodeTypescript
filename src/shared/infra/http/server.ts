import 'reflect-metadata';
import  express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';


import router from './routes/index';
import AppError from '@shared/errors/AppErrors';

import '@shared/infra/typeorm'
import '@shared/container'

const app = express();

app.use(express.json());
app.use(router);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if(err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  console.error(err);


  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });

});

app.listen(3333, () => {
  console.log('server running in port 3333');
});
