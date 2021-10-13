import ApiError from '../utils/ApiError';
import { Request, Response, NextFunction } from 'express';
import config from '../config/config';
const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  let { statusCode, message } = err;
  res.locals.errorMessage = err.message;
  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  if (config.env === 'development') {
    console.log(err);
  }

  res.status(statusCode).send(response);
};
export { errorHandler };
