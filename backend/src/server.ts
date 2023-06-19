import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';
import os from 'os';
import configs from './configs';
import router from './routes';
import client from './database/redis';

const app: Application = express();
const port: number = configs.port || 8080;
const corsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
    'X-Refresh-Token',
    'Authorization',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Methods'
  ],
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  preflightContinue: true,
  origin: true,
  credentials: true
};

const ip =
  os.networkInterfaces()['wlan0']?.[0].address ||
  os.networkInterfaces()['eth0']?.[0].address ||
  '127.0.0.1';

const uploads = path.join(__dirname, '..', 'uploads');
const icons = express.static(uploads + '/icons');
const products = express.static(uploads + '/products');

// Server Middlewares
app.use(helmet());
app.use(morgan('common'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads/icons', icons);
app.use('/uploads/products', products);
app.use(router);
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'Page not found!'
  });
});

const server = http.createServer(app).listen(port, () => {
  console.log(`Backend server is listening on http://${ip}:${port}`);
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

client.connect();

export { app, port, io };
