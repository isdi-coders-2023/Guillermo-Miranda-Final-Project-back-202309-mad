import { Router as createRouter } from 'express';
import { UserController } from '../controllers/users.controller.js';
import createDebug from 'debug';
import { UserMongoRepo } from '../repo/repo.users/users.mongo.repo.js';
// Import { AuthInterceptor } from '../middleware/auth.interceptor.js';

const debug = createDebug('FPB:users:router');

export const usersRouter = createRouter();
debug('Starting');

const repo = new UserMongoRepo();
const controller = new UserController(repo);
// Const interceptor = new AuthInterceptor();

usersRouter.get('/', controller.getAll.bind(controller));
usersRouter.post('/register', 
// FileInterceptor.singleFileStore()
// Validation interceptor,
controller.create.bind(controller));
usersRouter.post('/login', controller.login.bind(controller));
usersRouter.patch(
  '/login',
  // Interceptor.authorization.bind(interceptor),
  controller.login.bind(controller)
);
