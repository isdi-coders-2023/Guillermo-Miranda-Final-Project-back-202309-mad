import { LoginUser, UserStructure } from "../../entities/user";
import { Auth } from "../../services/auth";
import { HttpError } from "../../types/http.error";
import { UsersModel } from "./users.mongo.model";
import { UsersMongoRepo } from "./users.mongo.repo"


jest.mock('../../services/auth');
jest.mock("./users.mongo.model");

describe('Given UsersMongoRepo', () => {
  describe('When we instantiate it with and without errors', () => {
    
    
    
    test('then create should be called...',async ()=>{
      
      Auth.hash = jest.fn();
      const repo = new UsersMongoRepo();
      UsersModel.create = jest.fn().mockResolvedValue('test');
      const result = await repo.create({} as Omit<UserStructure,'id'>);
      expect(Auth.hash).toHaveBeenCalled();
      expect(UsersModel.create).toHaveBeenCalled();
      expect(result).toBe('test');
      
    })

    test('then login should be called...',async ()=>{

      const repo = new UsersMongoRepo();
      Auth.compare = jest.fn().mockReturnValue(true);
      let exec = jest.fn().mockResolvedValue('test');
      UsersModel.findOne = jest.fn().mockReturnValue({exec});
      const result = await repo.login({email: ''} as unknown as LoginUser);
      expect(Auth.compare).toHaveBeenCalled();
      expect(UsersModel.findOne).toHaveBeenCalled();
      expect(result).toBe('test');

      const repoError = new UsersMongoRepo();
      const mockError = new HttpError(401, 'Unauthorized');
      exec = jest.fn().mockResolvedValue(null);
      UsersModel.findOne = jest.fn().mockReturnValue({exec});
      const resultError = repoError.login({email: ''} as unknown as LoginUser);
      Auth.compare = jest.fn().mockReturnValue(false);
      expect(resultError).rejects.toThrow(mockError);

      
    });

    test('then getAll should be called...',async ()=>{

      const repo = new UsersMongoRepo();
      const exec = jest.fn().mockResolvedValue('test');
      UsersModel.find = jest.fn().mockReturnValue({exec});
      const result = await repo.getAll();
      expect(UsersModel.find).toHaveBeenCalled();
      expect(result).toBe('test');

    });

    test('then getById should be called...',async ()=>{

      const repo = new UsersMongoRepo();
      let exec = jest.fn().mockResolvedValue('test');
      UsersModel.findById = jest.fn().mockReturnValue({exec});
      const result = await repo.getById('id');
      expect(UsersModel.findById).toHaveBeenCalled();
      expect(result).toBe('test');

      const repoError = new UsersMongoRepo();
      const mockError = new HttpError(404, 'Not Found', 'GetById not possible');
      exec = jest.fn().mockResolvedValue(null);
      UsersModel.findById = jest.fn().mockReturnValue({exec});
      const resultError = repoError.getById('id');
      Auth.compare = jest.fn().mockReturnValue(false);
      expect(resultError).rejects.toThrow(mockError);

    });

    test('then update should be called...',async ()=>{

      const repo = new UsersMongoRepo();
      let exec = jest.fn().mockResolvedValue('test');
      UsersModel.findByIdAndUpdate = jest.fn().mockReturnValue({exec});
      const result = await repo.update('id',{});
      expect(UsersModel.findByIdAndUpdate).toHaveBeenCalled();
      expect(result).toBe('test');

      const repoError = new UsersMongoRepo();
      const mockError = new HttpError(404, 'Not Found', 'Update not possible');
      exec = jest.fn().mockResolvedValue(null);
      UsersModel.findByIdAndUpdate = jest.fn().mockReturnValue({exec});
      const resultError = repoError.update('id',{});
      Auth.compare = jest.fn().mockReturnValue(false);
      expect(resultError).rejects.toThrow(mockError);

    });

  })
})
