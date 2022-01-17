import { NextFunction, Request, Response } from 'express';

const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  let message = 'Server error, please try again later';
  let status = 500;
  if (err instanceof Error) message = err.message;
  else if (err && typeof err === 'object') {
    if ('message' in err && 'status' in err) {
      message = (err as { message: string; status: number }).message;
      status = (err as { message: string; status: number }).status;
    }
  }

  console.log(err);
  res.status(status).json(message);
};

export default errorHandler;
