import express from 'express';
import { json } from 'body-parser';
import router from './routes';
import { once } from 'events';
import dotenv from 'dotenv';

const startServer = async () => {
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(json());
    dotenv.config();
    app.use('/', router);
    const server = app.listen(process.env.LISTEN_PORT);
    await once(server, "listening");
    console.info(`Server listening on port ${process.env.LISTEN_PORT}`);
};

startServer();
