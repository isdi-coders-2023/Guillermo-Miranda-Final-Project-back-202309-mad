/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import createDebug from 'debug';
import { UserMongoRepo } from '../repo/repo.users/users.mongo.repo';
// Import { Auth } from '../services/auth.js';
// Import { Controller } from './controller.js';
import { UserStructure } from '../entities/user.js';

const debug = createDebug('FPB:user:controller')


export class UserController <UserStructure> {
  

  // eslint-disable-next-line no-unused-vars
  constructor(protected repo: UserMongoRepo){

    debug('Instantiated')
  }

  
  async getAll(_req: Request, res: Response, next: NextFunction) {
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

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = req.body.userid 
        ? await this.repo.getById(req.body.userid) 
        : await this.repo.login(req.body);

    /* Const data = {
        user: result,
        token: Auth.signJWT({ 
          id: result.id,
          email: result.email,
        }),
      };
      res.status(202);
      res.statusMessage = 'Accepted';
      res.json(data); */
    } catch (error) {
      next(error);
    }
  } 


  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.create(req.body);
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
