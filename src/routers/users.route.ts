import { Router as createRouter } from 'express';
import { UserController } from '../controllers/users.controller.js';
import createDebug from 'debug';
import { UsersMongoRepo } from '../repo/repo.users/users.mongo.repo.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';

const debug = createDebug('FPB:users:router');

export const usersRouter = createRouter();
debug('Starting');

const repo = new UsersMongoRepo();
const controller = new UserController(repo);
const interceptor = new AuthInterceptor();

usersRouter.get('/', controller.getAll.bind(controller));

usersRouter.post('/register', 
// Validation interceptor,
  controller.create.bind(controller)
);

usersRouter.post('/login', controller.login.bind(controller));

usersRouter.patch(
  '/update/:id', 
  interceptor.authorization.bind(interceptor),
  interceptor.authenticationUser.bind(interceptor),
  controller.update.bind(controller)
);
