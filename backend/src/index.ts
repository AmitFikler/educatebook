import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';

import errorHandler from './utils/middleware/errorHandlerMiddleware';
import config from './utils/config';

import apiRouter from './routers/api';

const MONGO_URI =
  process.env.NODE_ENV === 'test'
    ? config.mongodb_url_test
    : config.mongodb_url;
const PORT = config.port;

export const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
}); // socket.io

if (MONGO_URI && PORT) {
  mongoose
    .connect(MONGO_URI) // connect to mongodb
    .then(() => {
      console.log(`connected to MongoDB - ${MONGO_URI}`);
    })
    .catch((error) => {
      console.log('error connecting to MongoDB:', error.message);
    });
}

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('message', {
    name: 'Admin',
    message: 'Welcome to the chat app',
    room: 'lobby',
  });
});

app.use(cors()); //cors middleware
app.use(express.json()); //json middleware

app.use('/api', apiRouter);

app.use(errorHandler); //error handler middleware

export const server = httpServer.listen(PORT, () =>
  console.log(`app listening at http://localhost:${PORT}`)
);

export default app;
