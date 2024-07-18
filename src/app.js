import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bitcoinRoutes from './routes/bitcoinRoutes.js';
import errorHandler from './utils/errorHandler.js';
import bitcoinService from './services/bitcoinService.js';
import config from './config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', bitcoinRoutes);
app.use(errorHandler);

const startServer = () => {
    const server = app.listen(config.PORT, () => {
        console.log(`Server is running on port ${config.PORT}`);
        console.log(`Update frequency: ${config.UPDATE_FREQUENCY}ms`);
        console.log(`Service commission: ${config.SERVICE_COMMISSION * 100}%`);
    });

    const intervalId = setInterval(() => bitcoinService.fetchBitcoinPrice(), config.UPDATE_FREQUENCY);

    const gracefulShutdown = () => {
        console.log('Exiting...');
        clearInterval(intervalId);
        server.close(() => {
            console.log('Successfully terminated!');
            process.exit(0);
        });
    };

    process.on('SIGINT', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown);

    return server;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    startServer();
}

export { app, startServer };
