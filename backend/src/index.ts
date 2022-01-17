import express from 'express';
import cors from 'cors';

import errorHandler from './utils/middleware/errorHandlerMiddleware';
import config from './utils/config';

import apiRouter from './routers/api';

const app = express();

app.use(cors()); //cors middleware
app.use(express.json()); //json middleware

app.use('/api', apiRouter);

app.use(errorHandler); //error handler middleware

// start server
app.listen(config.port, () => {
  console.log(`running on http://localhost:${config.port}/`);
});
