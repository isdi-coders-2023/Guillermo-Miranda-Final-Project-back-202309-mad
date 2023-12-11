/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import createDebug from 'debug';
import { RecipesMongoRepo } from '../repos/repo.recipes/recipes.mongo.repo.js';

const debug = createDebug('FPB:recipes:controller')


export class RecipesController {

  constructor(protected repo: RecipesMongoRepo){
    debug('Instantiated')
  }

  async getAll(req: Request, res: Response, next: NextFunction) {

    try {
      const result = await this.repo.getAll();
      res.json(result);
    } catch (error) {
      next(error);
    }

  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.getById(req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {

    try {
      req.body.chef = {id: req.body.userID}
      const result = await this.repo.create(req.body.chef);
      res.status(201);
      res.statusMessage = 'Created';
      res.json(result);
    } catch (error) {
      next(error)
    }

  }

  async update(req: Request, res: Response, next: NextFunction) {

    try {
      const result = await this.repo.update(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
    
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this.repo.delete(req.params.id);
      res.status(204);
      res.statusMessage = 'No Content';
      res.json({});
    } catch (error) {
      next(error);
    }
  }

}
