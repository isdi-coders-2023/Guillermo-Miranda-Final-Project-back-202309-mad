import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { RecipesController } from '../controllers/recipes.controller.js';
import { RecipesMongoRepo } from '../repos/repo.recipes/recipes.mongo.repo.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { FileInterceptor } from '../middleware/file.interceptor.js';

const debug = createDebug('FPB:recipes:router');

export const recipesRouter = createRouter();
debug('Starting');

const repo = new RecipesMongoRepo();
const controller = new RecipesController(repo);
const interceptor = new AuthInterceptor();
const fileInterceptor = new FileInterceptor();

recipesRouter.get('/', controller.getAll.bind(controller));

recipesRouter.post('/create', 
// Validation interceptor,
  interceptor.authorization.bind(interceptor),
  // interceptor.authenticationRecipe.bind(interceptor),
  fileInterceptor.singleFileStore('picture').bind(fileInterceptor),
  controller.create.bind(controller)
);

recipesRouter.get('/:id', controller.getById.bind(controller));

  recipesRouter.patch(
  '/update/:id', 
  interceptor.authorization.bind(interceptor),
  interceptor.authenticationRecipe.bind(interceptor),
  controller.update.bind(controller)
  );

  recipesRouter.delete(
  '/delete/:id', 
  interceptor.authorization.bind(interceptor),
  interceptor.authenticationRecipe.bind(interceptor),
  controller.delete.bind(controller)
);
