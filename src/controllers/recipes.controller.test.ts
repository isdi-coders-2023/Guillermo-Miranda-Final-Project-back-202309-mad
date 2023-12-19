import { NextFunction, Request, Response } from "express";
import { RecipesController } from "./recipes.controller"
import { RecipesMongoRepo } from "../repos/repo.recipes/recipes.mongo.repo";
import { error } from "console";
import { HttpError } from "../types/http.error";
import { CloudinaryMediaFiles } from "../services/media.file";
import { recipeStructure } from "../entities/recipes";




jest.mock('../services/auth.js')
describe('Given RecipesController', () => {
  
  describe('When we instantiate it with and without errors', () => {

    const mockError = jest.fn().mockReturnValue(error);
    let mockResponse: Response;
    const mockNext = jest.fn() as NextFunction;

    test('then when getAll should be call',async()=>{
    
      const mockRequest = {
        body:{}
      } as unknown as Request;

      const mockRepo = {
        getAll: jest.fn().mockResolvedValue([{}])
      } as unknown as RecipesMongoRepo; 

      mockResponse = {
        json: jest.fn().mockResolvedValue([{}]),
        status:jest.fn()
      } as unknown as Response;

      const controller = new RecipesController(mockRepo);
      await controller.getAll(mockRequest,mockResponse,mockNext);
      expect(mockResponse.status).toHaveBeenCalled()
      expect(mockResponse.json).toHaveBeenCalled();

     
      const mockRepoFail = {
        getAll: jest.fn().mockRejectedValue(mockError)
      } as unknown as RecipesMongoRepo;
      const controllerError = new RecipesController(mockRepoFail);
      await controllerError.getAll(mockRequest,mockResponse,mockNext);
      expect(mockNext).toHaveBeenCalledWith(mockError);

    });

    test('then when getUserRecipes should be call',async()=>{
    
      const mockRequest = {
        params:{userID:''},
        body: {}
      } as unknown as Request;

      const mockRepo = {
        getByIdMyRecipes: jest.fn().mockResolvedValue([{}])
      } as unknown as RecipesMongoRepo; 

      mockResponse = {
        json: jest.fn().mockResolvedValue([{}]),
        status:jest.fn()
      } as unknown as Response;

      const controller = new RecipesController(mockRepo);
      await controller.getUserRecipes(mockRequest,mockResponse,mockNext);
      expect(mockResponse.json).toHaveBeenCalled();

     
      const mockRepoFail = {
        getUserRecipes: jest.fn().mockRejectedValue(mockError)
      } as unknown as RecipesMongoRepo;
      const controllerError = new RecipesController(mockRepoFail);
      await controllerError.getUserRecipes(mockRequest,mockResponse,mockNext);
      expect(mockNext).toHaveBeenCalledWith(mockError);

    });

    test('then when getById should be call',async()=>{
    
      const mockRequest = {
        params: {id: '1'}
      } as unknown as Request;

      const mockRepo = {
        getById: jest.fn().mockResolvedValue({id: '1'})
      } as unknown as RecipesMongoRepo; 

      mockResponse = {
        json: jest.fn(),
        status:jest.fn()
      } as unknown as Response;

      const controller = new RecipesController(mockRepo);
      await controller.getById(mockRequest,mockResponse,mockNext);
      expect(mockRepo.getById).toHaveBeenCalled()
      expect(mockResponse.json).toHaveBeenCalled();

    const mockError = new Error('error')
      const mockRepoFail = {
        getById: jest.fn().mockRejectedValue(mockError)
      } as unknown as RecipesMongoRepo;
      const controllerError = new RecipesController(mockRepoFail);
      await controllerError.getById(mockRequest,mockResponse,mockNext);
      expect(mockNext).toHaveBeenCalledWith(mockError);

    });

    test('then when create should be call',async()=>{

      const mockRepo = {
        create: jest.fn().mockResolvedValue({})
      } as unknown as RecipesMongoRepo;

      const mockRequest = {
        body: {
          userid: { id: '1' },
          image: {
            publicId: 'mockPublicId',
            format: 'mockformat',
            url: 'mockUrl',
            size: '0',
            cloudinaryURL: 'mockUrl',
          },
        },
        file: { path: 'mockPath' }
      } as unknown as Request;
      

      mockResponse = {
        json:jest.fn().mockResolvedValue({}),
        status: jest.fn().mockResolvedValue(201),
        statusMessage: ''
      } as unknown as Response;

        const controller = new RecipesController(mockRepo);
        const mockCloudinaryService = {
          uploadImage: jest.fn().mockResolvedValue(''),
        };
        controller.cloudinaryService = mockCloudinaryService;
        await controller.create(mockRequest, mockResponse, mockNext);
        expect(mockCloudinaryService.uploadImage).toHaveBeenCalled();

        const mockRepoFail = {
          create: jest.fn().mockRejectedValue({})
        } as unknown as RecipesMongoRepo;
        const mockRequestFail = {
          body: {userid:null},
          file: undefined,
        } as unknown as Request;
        const controllerError = new RecipesController(mockRepoFail);
        await controllerError.create(mockRequestFail,mockResponse,mockNext);
        expect(mockNext).toHaveBeenCalledWith(new HttpError(406, 'Not Acceptable', 'Invalid multer file'));
        
    });

    test('then when update should be call',async()=>{

const mockreci = {id: '1', recipeName: 'prueba'} as unknown as recipeStructure

      const mockRepo = {
        update: jest.fn().mockResolvedValue(mockreci)
      } as unknown as RecipesMongoRepo;

      const mockRequest = {
        body: {
          userId: '1',
          picture: {url: ''} as unknown as ImageData,
          chef: '1'
        },
        file: {  path: ''},
        params: {id: '1'}
      } as unknown as Request;

      mockResponse = {
        json: jest.fn(),
        status: jest.fn()
      }as unknown as Response;

      const controller = new RecipesController(mockRepo);
      const mockCloudinaryService = {
        uploadImage: jest.fn().mockResolvedValue({url: ''}),
      } as unknown as CloudinaryMediaFiles
      controller.cloudinaryService = mockCloudinaryService;
      await controller.update(mockRequest, mockResponse, mockNext);
      expect(mockCloudinaryService.uploadImage).toHaveBeenCalled();
      expect(mockRepo.update).toHaveBeenCalled()
      expect(mockResponse.json).toHaveBeenCalled()
      

      const mockRepoFailPicture = {
        update: jest.fn().mockRejectedValue({})
      } as unknown as RecipesMongoRepo;
      const mockRequestFail = {
        body: {userid:null},
        file: undefined,
      } as unknown as Request;
      const controllerErrorPicture = new RecipesController(mockRepoFailPicture);
      await controllerErrorPicture.update(mockRequestFail,mockResponse,mockNext);
      expect(mockNext).toHaveBeenCalledWith(new HttpError(406, 'Not Acceptable', 'Invalid multer file'));

    });

    test('then when delete should be call',async()=>{
    
      const mockRequest = {
        params: 'id'
      } as unknown as Request;

      const mockRepo = {
        delete: jest.fn().mockResolvedValue({})
      } as unknown as RecipesMongoRepo; 

      mockResponse = {
        json: jest.fn().mockResolvedValue({}),
        status:jest.fn().mockResolvedValue('200')
      } as unknown as Response;

      const controller = new RecipesController(mockRepo);
      await controller.delete(mockRequest,mockResponse,mockNext);
      expect(mockResponse.json).toHaveBeenCalled();

     
      const mockRepoFail = {
        delete: jest.fn().mockRejectedValue(mockError)
      } as unknown as RecipesMongoRepo;
      const controllerError = new RecipesController(mockRepoFail);
      await controllerError.delete(mockRequest,mockResponse,mockNext);
      expect(mockNext).toHaveBeenCalledWith(mockError);

    });
  })
})
