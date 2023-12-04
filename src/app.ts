import cors from 'cors';
import express from 'express'
import morgan from 'morgan';
import createDebug from 'debug';
// Import { usersRouter } from './routers/user.router.js';

const debug = createDebug('FPB:app');

export const app = express();
debug('Starting');

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static('public'));


// App.use('/users', usersRouter); 

