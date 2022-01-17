import express from 'express';
import cors from 'cors';
import errorHandler from './utils/middleware/errorHandlerMiddleware';

import config from './utils/config';

const app = express();
app.use(express.json()); //json middleware
app.use(cors()); //cors middleware

app.use(errorHandler); //error handler middleware

// start server
app.listen(config.port, () => {
  console.log(`running on http://localhost:${config.port}/`);
});
