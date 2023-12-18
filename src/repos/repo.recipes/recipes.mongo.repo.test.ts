import { recipeStructure } from "../../entities/recipes";
import { Auth } from "../../services/auth";
import { HttpError } from "../../types/http.error";
import { UsersMongoRepo } from "../repo.users/users.mongo.repo";
import { RecipesModel } from "./recipes.mongo.model";
import { RecipesMongoRepo } from "./recipes.mongo.repo"


jest.mock('../../services/auth');
jest.mock("./recipes.mongo.model");

describe('Given RecipesMongoRepo', () => {
  describe('When we instantiate it with and without errors', () => {
    
    
    
    test('then create should be called...',async ()=>{
      
      const repo = new RecipesMongoRepo();
      RecipesModel.create = jest.fn().mockResolvedValue('test');
      UsersMongoRepo.prototype.getById = jest.fn().mockResolvedValue('id');
      UsersMongoRepo.prototype.update = jest.fn().mockResolvedValue({ myRecipes: []});
      const result = await repo.create({} as Omit<recipeStructure,'id'>);
      expect(RecipesModel.create).toHaveBeenCalled();
      expect(result).toBe('test');
      
    })

    test('then getAll should be called...',async ()=>{

      const repo = new RecipesMongoRepo();
      const exec = jest.fn().mockResolvedValue('test');
      const populate = jest.fn().mockReturnValue({exec});
      RecipesModel.find = jest.fn().mockReturnValue({populate,exec});
      const result = await repo.getAll();
      expect(RecipesModel.find).toHaveBeenCalled();
      expect(result).toBe('test');

    });

    test('then getById should be called...',async ()=>{

      const repo = new RecipesMongoRepo();
      let exec = jest.fn().mockResolvedValue('test');
      let populate = jest.fn().mockReturnValue({exec});
      RecipesModel.findById = jest.fn().mockReturnValue({populate,exec});
      const result = await repo.getById('id');
      expect(RecipesModel.findById).toHaveBeenCalled();
      expect(result).toBe('test');

      const repoError = new RecipesMongoRepo();
      const mockError = new HttpError(404, 'Not Found', 'GetById not possible');
      exec = jest.fn().mockResolvedValue(null);
      populate = jest.fn().mockReturnValue({exec});
      RecipesModel.findById = jest.fn().mockReturnValue({populate,exec});
      const resultError = repoError.getById('id');
      Auth.compare = jest.fn().mockReturnValue(false);
      expect(resultError).rejects.toThrow(mockError);

    });
    
    test('then getByIdMyRecipes should be called...',async ()=>{

      const repo = new RecipesMongoRepo();
      let exec = jest.fn().mockResolvedValue('test');
      let populate = jest.fn().mockReturnValue({exec});
      RecipesModel.findById = jest.fn().mockReturnValue({populate,exec});
      const result = await repo.getById('id');
      expect(RecipesModel.findById).toHaveBeenCalled();
      expect(result).toBe('test');

      const repoError = new RecipesMongoRepo();
      const mockError = new HttpError(404, 'Not Found', 'GetById not possible');
      exec = jest.fn().mockResolvedValue(null);
      populate = jest.fn().mockReturnValue({exec});
      RecipesModel.findById = jest.fn().mockReturnValue({populate,exec});
      const resultError = repoError.getById('id');
      Auth.compare = jest.fn().mockReturnValue(false);
      expect(resultError).rejects.toThrow(mockError);

    });

    test('then update should be called...',async ()=>{

      const repo = new RecipesMongoRepo();
      let exec = jest.fn().mockResolvedValue('test');
      let populate = jest.fn().mockReturnValue({exec});
      RecipesModel.findByIdAndUpdate = jest.fn().mockReturnValue({populate,exec});
      const result = await repo.update('id',{});
      expect(RecipesModel.findByIdAndUpdate).toHaveBeenCalled();
      expect(result).toBe('test');

      const repoError = new RecipesMongoRepo();
      const mockError = new HttpError(404, 'Not Found', 'Update not possible');
      exec = jest.fn().mockResolvedValue(null);
      populate = jest.fn().mockReturnValue({exec});
      RecipesModel.findByIdAndUpdate = jest.fn().mockReturnValue({populate,exec});
      const resultError = repoError.update('id',{});
      Auth.compare = jest.fn().mockReturnValue(false);
      expect(resultError).rejects.toThrow(mockError);

    });

    test('then delete should be called...',async ()=>{

      const repo = new RecipesMongoRepo();
      let exec = jest.fn().mockResolvedValue(null);
      let populate = jest.fn().mockReturnValue({exec});
      RecipesModel.findByIdAndDelete= jest.fn().mockReturnValue({populate,exec});
      const result = await repo.delete('id');
      expect(RecipesModel.findByIdAndDelete).toHaveBeenCalled();
      expect(result).toBe(null);

      const repoError = new RecipesMongoRepo();
      const mockError = new HttpError(404, 'Not Found', 'GetById not possible');
      exec = jest.fn().mockResolvedValue(null);
      populate = jest.fn().mockReturnValue({exec});
      RecipesModel.findByIdAndDelete = jest.fn().mockReturnValue({populate,exec});
      const resultError = repoError.delete('id');
      Auth.compare = jest.fn().mockReturnValue(false);
      expect(resultError).rejects.toThrow(mockError);

    });

  })
})
 
