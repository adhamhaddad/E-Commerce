import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { Server } from 'socket.io';
import configs from './configs';
import router from './routes';

const app: Application = express();
const port: number = configs.port || 80;
const corsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
    'Authorization',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Methods'
  ],
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  preflightContinue: true,
  origin: '*'
};

// Server Middlewares
app.use(helmet());
app.use(morgan('combined'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Server Controllers
app.use(router);

// Server Listener
const server = https
  .createServer(
    {
      key: fs.readFileSync(
        path.join(__dirname, '..', 'certificate', 'key.pem')
      ),
      cert: fs.readFileSync(
        path.join(__dirname, '..', 'certificate', 'cert.pem')
      )
    },
    app
  )
  .listen(port, () => {
    console.log(`Backend server is listening on ${configs.backend_host}`);
    console.log(`Frontend server is listening on ${configs.frontend_host}`);
    console.log('Press CTRL+C to stop the server.');
  });

const io = new Server(server, {
  cors: corsOptions
});
io.on('connection', (socket) => {
  console.log('User connected', socket.id);
  io.on('disconnect', (socket) => {
    console.log('User disconnected', socket);
  });
});

export { app, port, io };
