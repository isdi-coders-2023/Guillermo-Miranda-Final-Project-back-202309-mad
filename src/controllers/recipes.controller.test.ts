import { NextFunction, Request, Response } from "express";
import { RecipesController } from "./recipes.controller"
import { RecipesMongoRepo } from "../repos/repo.recipes/recipes.mongo.repo";
import { get } from "mongoose";
import { error } from "console";




jest.mock('../services/auth.js')
describe('Given RecipesController', () => {
  
  describe('When we instantiate it with and without errors', () => {

    const mockError = jest.fn().mockReturnValue(error);
    let mockResponse: Response;
    const mockNext = jest.fn() as NextFunction;

    test('then when getAll should be call',async()=>{
    
      const mockRequest = {
        method: get
      } as unknown as Request;

      const mockRepo = {
        getAll: jest.fn().mockResolvedValue([{}])
      } as unknown as RecipesMongoRepo; 

      mockResponse = {
        json: jest.fn()
      } as unknown as Response;

      const controller = new RecipesController(mockRepo);
      await controller.getAll(mockRequest,mockResponse,mockNext);
      expect(mockResponse.json).toHaveBeenCalledWith([{}]);

     
      const mockRepoFail = {
        getAll: jest.fn().mockRejectedValue(mockError)
      } as unknown as RecipesMongoRepo;
      const controllerError = new RecipesController(mockRepoFail);
      await controllerError.getAll(mockRequest,mockResponse,mockNext);
      expect(mockNext).toHaveBeenCalledWith(mockError);

    });

    test('then when getUserRecipes should be call',async()=>{
    
      const mockRequest = {
        params:{id:''},
        body: {}
      } as unknown as Request;

      const mockRepo = {
        getUserRecipes: jest.fn().mockResolvedValue([{}])
      } as unknown as RecipesMongoRepo; 

      mockResponse = {
        json: jest.fn().mockResolvedValue([{}])
      } as unknown as Response;

      const controller = new RecipesController(mockRepo);
      await controller.getUserRecipes(mockRequest,mockResponse,mockNext);
      expect(mockResponse.json).toHaveBeenCalledWith([{}]);

     
      const mockRepoFail = {
        getUserRecipes: jest.fn().mockRejectedValue(mockError)
      } as unknown as RecipesMongoRepo;
      const controllerError = new RecipesController(mockRepoFail);
      await controllerError.getUserRecipes(mockRequest,mockResponse,mockNext);
      expect(mockNext).toHaveBeenCalledWith(mockError);

    });

    test('then when create should be call',async()=>{

      const mockRepo = {
        create: jest.fn().mockResolvedValue({})
      } as unknown as RecipesMongoRepo;

      const mockRequest = {
        body: {}
      } as unknown as Request;

      mockResponse = {
        json:jest.fn().mockResolvedValue({}),
        status: jest.fn().mockResolvedValue(201),
        statusMessage: ''
      } as unknown as Response;

        const controller = new RecipesController(mockRepo);
        await controller.create(mockRequest, mockResponse, mockNext);
        expect(mockResponse.json).toHaveBeenCalledWith({});

        const mockRepoFail = {
          create: jest.fn().mockRejectedValue(mockError)
        } as unknown as RecipesMongoRepo;
        const controllerError = new RecipesController(mockRepoFail);
        await controllerError.create(mockRequest,mockResponse,mockNext);
        expect(mockNext).toHaveBeenCalledWith(mockError);
        
    });

    test('then when update should be call',async()=>{

      const mockRepo = {
        update: jest.fn().mockResolvedValue({})
      } as unknown as RecipesMongoRepo;

      const mockRequest = {
        params:{id:''},
        body: {}
      } as unknown as Request;

      mockResponse = {
        json: jest.fn().mockResolvedValue({})
      }as unknown as Response;

      const controller = new RecipesController(mockRepo);
      await controller.update(mockRequest,mockResponse,mockNext);
      expect(mockResponse.json).toHaveBeenCalledWith({});

      const mockRepoFail = {
        update: jest.fn().mockRejectedValue(mockError)
      } as unknown as RecipesMongoRepo;
      const controllerError = new RecipesController(mockRepoFail);
      await controllerError.update(mockRequest,mockResponse,mockNext);
      expect(mockNext).toHaveBeenCalledWith(mockError);

    });
  })
})
