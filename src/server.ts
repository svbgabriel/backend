import express, { Express, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Server } from 'http';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import socketio from 'socket.io';
import routes from './routes';

dotenv.config();

const app: Express = express();
app.use(cors());

const server = new Server(app);
const io = socketio(server);

io.on('connection', socket => {
  socket.on('connectRoom', box => {
    socket.join(box);
  });
});

mongoose.connect(String(process.env.DB_URL), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req: any, res: Response, next: NextFunction) => {
  req.io = io;

  return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(routes);

server.listen(process.env.PORT);
