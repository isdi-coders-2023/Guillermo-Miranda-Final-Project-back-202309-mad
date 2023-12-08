import { Request, Response } from 'express';
import { Auth } from '../services/auth';
import { AuthInterceptor } from './auth.interceptor';
import { UsersMongoRepo } from '../repo/repo.users/users.mongo.repo';
import { HttpError } from '../types/http.error';
import { Repository } from '../repo/repo'
import { UserStructure } from '../entities/user';

describe('Given the class AuthInterceptor', () => {
  const authInterceptor = new AuthInterceptor();
  const mockeResponse = {} as unknown as Response;
  const mockNext = jest.fn();
  describe('When it is instantiated and...', () => {

    test('Then, when the method authorization is called', () => {
      const mockRequest = {
        get: jest.fn().mockReturnValue('Bearer Token'),
        body: {},
      } as unknown as Request;
      Auth.verifyAndGetPayload = jest.fn().mockReturnValueOnce({ id: '1' });
      authInterceptor.authorization(mockRequest, mockeResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    test('Then, when the method authenticationUser is called', () => {
      const repo = new UsersMongoRepo();
      const mockRequest = {
        params:'',
        body: {},
      } as unknown as Request;
      repo.getById = jest.fn().mockResolvedValue('');
      authInterceptor.authenticationUser(mockRequest, mockeResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
      
    });

  });
  describe('When there are errors', () => {

    test('When there is no authorization', () => {
      const mockRequest = {
        get: jest.fn().mockReturnValue(null),
        body: {},
      } as unknown as Request;
      authInterceptor.authorization(mockRequest, mockeResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    test('When there is no authorization',() => {
      const repo = new UsersMongoRepo() as unknown as Repository<UserStructure> ;
      const mockError = new HttpError(401, 'Unauthorized', 'User not valid');
      const mockRequest = {
        params:'',
        body: {},
      } as unknown as Request;
      repo.getById('false');
      authInterceptor.authenticationUser(mockRequest, mockeResponse, mockNext);
      expect(repo.getById).rejects.toThrow(mockError);
      expect(mockNext).toHaveBeenCalled();
    });

  });
});
