import { NextFunction, Request, Response } from 'express';
import { Auth } from '../services/auth.js';
import { AuthInterceptor } from './auth.interceptor.js';
import { RecipesMongoRepo } from '../repos/repo.recipes/recipes.mongo.repo.js';
import { HttpError } from '../types/http.error.js';
import { UsersMongoRepo } from '../repos/repo.users/users.mongo.repo.js';


describe('Given the class AuthInterceptor', () => {
  const authInterceptor = new AuthInterceptor();
  const mockResponse = {} as unknown as Response;
  const mockNext = jest.fn() as NextFunction;
  describe('When it is instantiated and...', () => {

    test('Then, when the method authorization is called', () => {
      const mockRequest = {
        get: jest.fn().mockReturnValue('Bearer Token'),
        body: {},
      } as unknown as Request;
      Auth.verifyAndGetPayload = jest.fn().mockReturnValueOnce({ id: '1' });
      authInterceptor.authorization(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('When we use authenticationRecipes method', () => {

    test('Then should call next when the user is the owner of the recipe', async () => {
      const mockRequest = {
        body: {userId: 'userId'},
        params: { id: 'recipeId' }
      } as unknown as Request;
      const mockRecipe = { chef: mockRequest.body };
      const mockRepo = { getById: jest.fn().mockResolvedValue(mockRecipe) };

      jest.spyOn(RecipesMongoRepo.prototype, 'getById').mockImplementation(mockRepo.getById);

      await authInterceptor.authenticationRecipe(mockRequest, mockResponse, mockNext);

      expect(mockRepo.getById).toHaveBeenCalledWith('recipeId');
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('When we use authenticationUser method', () => {

    test('Then should call next when the user is the owner of the recipe', async () => {
      const mockRequest = {
      body: {userId: 'userId'},
      params: { id: 'sameId' }
      } as unknown as Request;
      const mockUser = { id: mockRequest.body };
      const mockRepo = { getById: jest.fn().mockResolvedValue(mockUser) };

      jest.spyOn(UsersMongoRepo.prototype, 'getById').mockImplementation(mockRepo.getById);

      await authInterceptor.authenticationUser(mockRequest, mockResponse, mockNext);

      expect(mockRepo.getById).toHaveBeenCalledWith('sameId');
      expect(mockNext).toHaveBeenCalled();
    });
  });


  describe('When there are errors', () => {

    test('When there is no authorization', () => {
      const mockRequest = {
        get: jest.fn().mockReturnValue(null),
        body: {},
      } as unknown as Request;
      authInterceptor.authorization(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    test('When there is no authenticationRecipes', async() => {
      const mockRequest = {
        body: {userId: 'userId'},
        params: { id: 'recipeId' }
      } as unknown as Request;
      const mockRecipe = { chef: mockRequest.body };
      const mockRepo = { getById: jest.fn().mockResolvedValue(mockRecipe) };

      jest.spyOn(RecipesMongoRepo.prototype, 'getById').mockImplementation(mockRepo.getById);
      await authInterceptor.authenticationRecipe(mockRequest, mockResponse, mockNext);
      expect(mockRepo.getById).toHaveBeenCalledWith('recipeId');;
      expect(mockNext).toHaveBeenCalledWith(expect.any(HttpError));

    });

    test('When there is no authenticationUser', async() => {
      const mockRequest = {
        body: {userId: 'userId'},
        params: { id: 'sameId' }
      } as unknown as Request;
      const mockUser = { id: mockRequest.body };
      const mockRepo = { getById: jest.fn().mockResolvedValue(mockUser) };
 
      jest.spyOn(UsersMongoRepo.prototype, 'getById').mockImplementation(mockRepo.getById);
 
      await authInterceptor.authenticationUser(mockRequest, mockResponse, mockNext);
 
      expect(mockRepo.getById).toHaveBeenCalledWith('sameId')
      expect(mockNext).toHaveBeenCalledWith(expect.any(HttpError));
    });


  });
});
