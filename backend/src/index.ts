import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import errorHandler from './utils/middleware/errorHandlerMiddleware';
import config from './utils/config';

import apiRouter from './routers/api';

const MONGO_URI = config.mongodb_url;
const PORT = config.port;

const app = express();
if (MONGO_URI && PORT) {
  mongoose
    .connect(MONGO_URI) // connect to mongodb
    .then(() => {
      console.log(`connected to MongoDB - ${config.mongodb_url}`);
      app.listen(config.port, () =>
        console.log(`app listening at http://localhost:${config.port}`)
      );
    })
    .catch((error) => {
      console.log('error connecting to MongoDB:', error.message);
    });
}

app.use(cors()); //cors middleware
app.use(express.json()); //json middleware

app.use('/api', apiRouter);

app.use(errorHandler); //error handler middleware

// start server
