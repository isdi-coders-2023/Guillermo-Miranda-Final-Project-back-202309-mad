import cors from 'cors';
import express from 'express'
import morgan from 'morgan';
import createDebug from 'debug';
import { usersRouter } from '../routers/users.router.js';
import { recipesRouter } from '../routers/recipes.router.js';

const debug = createDebug('FPB:app');

export const app = express();
debug('Starting');

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static('public'));


app.use('/users', usersRouter); 
app.use('/recipes', recipesRouter); 
