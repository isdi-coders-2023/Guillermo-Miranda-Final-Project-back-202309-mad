/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import createDebug from 'debug';
import { RecipesMongoRepo } from '../repos/repo.recipes/recipes.mongo.repo.js';
import { HttpError } from '../types/http.error.js';
import { CloudinaryMediaFiles } from '../services/media.file.js';

const debug = createDebug('FPB:recipes:controller')


export class RecipesController {
  cloudinaryService: CloudinaryMediaFiles;
  constructor(protected repo: RecipesMongoRepo){
    this.cloudinaryService = new CloudinaryMediaFiles();
    debug('Instantiated')
  }

  async getAll(req: Request, res: Response, next: NextFunction) {

    try {
      if (!req.body) throw new HttpError(400, 'Bad Request');
      const result = await this.repo.getAll();
      res.status(200);
      res.statusMessage = 'Accepted';
      res.json(result);
    } catch (error) {
      next(error);
    }

  }

  async getUserRecipes(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params) throw new HttpError(400, 'Bad Request');
      const result = await this.repo.getByIdMyRecipes(req.params.userID);
      res.status(200);
      res.statusMessage = 'Accepted';
      res.json(result);
    } catch (error) {
      next(error);
    }

  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) throw new HttpError(400, 'Bad Request');
      const result = await this.repo.getById(req.params.id);
      res.status(200);
      res.statusMessage = 'Accepted';
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.chef = { id: req.body.userid};
      if (!req.file)
        throw new HttpError(406, 'Not Acceptable', 'Invalid multer file');
      const imgData = await this.cloudinaryService.uploadImage(req.file.path);
      req.body.picture = {
        publicId: req.file?.filename,
        format: req.file?.mimetype,
        url: req.file?.path,
        size: req.file?.size,
        cloudinaryURL: imgData.url,
      };
      
      const result = await this.repo.create(req.body);
    
      res.status(201);
      res.statusMessage = 'Created';
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    
    try {

    req.body.chef = req.body.userId;

      if (req.file) {
        const imagData = await this.cloudinaryService.uploadImage(req.file.path);
        req.body.picture = imagData;
      }

      const result = await this.repo.update(req.params.id, req.body);
      res.status(200);
      res.statusMessage = 'Updated';
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
