import '@shared/infra/typeorm';
import 'express-async-errors';
import 'reflect-metadata';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

import uploadConfig from "@config/upload";
import AppError from '@shared/errors/AppError';
import routes from "@shared/infra/http/routes";

const app = express()
app.use(cors());
app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if(err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
     });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'internal server error'
  });
})

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!')
})