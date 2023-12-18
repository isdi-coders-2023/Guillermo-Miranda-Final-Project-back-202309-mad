import { NextFunction, Request, Response } from "express";
import { UserController } from "./users.controller"
import { UsersMongoRepo } from "../repos/repo.users/users.mongo.repo";
import { UserStructure } from "../entities/user";
import { get } from "mongoose";
import { error } from "console";



jest.mock('../services/auth.js')
describe('Given UsersController', () => {
  
  describe('When we instantiate it with and without errors', () => {

    const mockError = jest.fn().mockReturnValue(error);
    let mockResponse: Response;
    const mockNext = jest.fn() as NextFunction;

    test('then when getAllUsers should be call',async()=>{
    
      const mockRequest = {
        method: get
      } as unknown as Request;

      const mockRepo = {
        getAllUsers: jest.fn().mockResolvedValue([{}])
      } as unknown as UsersMongoRepo; 

      mockResponse = {
        json: jest.fn().mockResolvedValue([{}])
      } as unknown as Response;

      const controller = new UserController(mockRepo);
      await controller.getAllUsers(mockRequest,mockResponse,mockNext);
      expect(mockResponse.json).toHaveBeenCalledWith([{}]);

     
      const mockRepoFail = {
        getAllUsers: jest.fn().mockRejectedValue(mockError)
      } as unknown as UsersMongoRepo;
      const controllerError = new UserController(mockRepoFail);
      await controllerError.getAllUsers(mockRequest,mockResponse,mockNext);
      expect(mockNext).toHaveBeenCalledWith(mockError);

    });

    test('then when getById should be call',async()=>{

      const mockRepo = {
        getById: jest.fn().mockResolvedValue({})
      } as unknown as UsersMongoRepo;

      const mockRequest = {
        params:{id:''}
      } as unknown as Request;

      mockResponse = {
        json: jest.fn().mockResolvedValue({})
      }as unknown as Response;

      const controller = new UserController(mockRepo);
      await controller.getById(mockRequest,mockResponse,mockNext);
      expect(mockResponse.json).toHaveBeenCalled();

      const mockRepoFail = {
        getById: jest.fn().mockRejectedValue(mockError)
      } as unknown as UsersMongoRepo;
      const controllerError = new UserController(mockRepoFail);
      await controllerError.getById(mockRequest,mockResponse,mockNext);
      expect(mockNext).toHaveBeenCalledWith(mockError);

    });

    test('then when login should be call',async()=>{

      const mockUser = {
        user: {} as unknown as UserStructure,
        token: ''
      }
      
        const mockRepo = {
        login: jest.fn().mockResolvedValue(mockUser)
      } as unknown as UsersMongoRepo;
    
      const mockRequest = {
        body:{id: '', email: ''}
      } as unknown as Request;
    
      mockResponse = {
          json: jest.fn().mockReturnValue(mockUser),
          statusMessage: '',
          status: jest.fn().mockReturnValue(202)
      } as unknown as Response;
      
        const controller = new UserController(mockRepo);
        await controller.login(mockRequest,mockResponse,mockNext);
        expect(mockResponse.json).toHaveBeenCalled();

        const mockRepoFail = {
          login: jest.fn().mockRejectedValue(mockError)
        } as unknown as UsersMongoRepo;
        const controllerError = new UserController(mockRepoFail);
        await controllerError.login(mockRequest,mockResponse,mockNext);
        expect(mockNext).toHaveBeenCalledWith(mockError);

    });

    test('then when create should be call',async()=>{

      const mockRepo = {
        create: jest.fn().mockResolvedValue({})
      } as unknown as UsersMongoRepo;

      const mockRequest = {
        body: {}
      } as unknown as Request;

      mockResponse = {
        json:jest.fn().mockResolvedValue({}),
        status: jest.fn().mockResolvedValue(201),
        statusMessage: ''
      } as unknown as Response;

        const controller = new UserController(mockRepo);
        await controller.create(mockRequest, mockResponse, mockNext);
        expect(mockResponse.json).toHaveBeenCalled();

        const mockRepoFail = {
          create: jest.fn().mockRejectedValue(mockError)
        } as unknown as UsersMongoRepo;
        const controllerError = new UserController(mockRepoFail);
        await controllerError.create(mockRequest,mockResponse,mockNext);
        expect(mockNext).toHaveBeenCalledWith(mockError);
        
    });

    test('then when update should be call',async()=>{

      const mockRepo = {
        update: jest.fn().mockResolvedValue({})
      } as unknown as UsersMongoRepo;

      const mockRequest = {
        params:{id:''},
        body: {}
      } as unknown as Request;

      mockResponse = {
        json: jest.fn().mockResolvedValue({})
      }as unknown as Response;

      const controller = new UserController(mockRepo);
      await controller.update(mockRequest,mockResponse,mockNext);
      expect(mockResponse.json).toHaveBeenCalled();

      const mockRepoFail = {
        update: jest.fn().mockRejectedValue(mockError)
      } as unknown as UsersMongoRepo;
      const controllerError = new UserController(mockRepoFail);
      await controllerError.update(mockRequest,mockResponse,mockNext);
      expect(mockNext).toHaveBeenCalledWith(mockError);

    });
  })
})
