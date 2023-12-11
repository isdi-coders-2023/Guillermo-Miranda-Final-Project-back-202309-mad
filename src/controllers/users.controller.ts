/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import createDebug from 'debug';
import { UsersMongoRepo } from '../repos/repo.users/users.mongo.repo.js';
import { Auth } from '../services/auth.js';
import { loginResponse } from '../types/login.response.js';



const debug = createDebug('FPB:users:controller')


export class UserController {

  constructor(protected repo: UsersMongoRepo){
    debug('Instantiated')
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {

    try {
      const result = await this.repo.getAllUsers();
      res.json(result);
    } catch (error) {
      next(error);
    }

  }
 
  async login(req: Request, res: Response, next: NextFunction) {

    try {
      const result = await this.repo.login(req.body);

    const data: loginResponse = {
        user: result,
        token: Auth.signJWT({ 
          id: result.id,
          email: result.email,
        }),
      };
      res.status(202);
      res.statusMessage = 'Accepted';
      res.json(data); 
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

}
