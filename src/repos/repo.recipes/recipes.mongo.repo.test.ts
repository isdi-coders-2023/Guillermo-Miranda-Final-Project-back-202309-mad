import { recipeStructure } from "../../entities/recipes";
import { UserStructure } from "../../entities/user";
import { Auth } from "../../services/auth";
import { HttpError } from "../../types/http.error";
import { UsersModel } from "../repo.users/users.mongo.model";
import { UsersMongoRepo } from "../repo.users/users.mongo.repo";
import { RecipesModel } from "./recipes.mongo.model";
import { RecipesMongoRepo } from "./recipes.mongo.repo"
describe('Given RecipesMongoRepo', () => {
    const repo = new RecipesMongoRepo();
  
    test('then create should be called...',async ()=>{

      const mockuser = {myRecipes:[{}]} as unknown as UserStructure;
      RecipesModel.create = jest.fn().mockResolvedValue('test');
      UsersMongoRepo.prototype.getById = jest.fn().mockResolvedValue('id');
      const userID = {id:'id'} as unknown as UserStructure;
      UsersMongoRepo.prototype.getById = jest.fn().mockResolvedValue(mockuser);
      UsersMongoRepo.prototype.update = jest.fn().mockResolvedValue({ myRecipes: []});
      const result = await repo.create({...{}, chef: userID } as unknown as Omit<recipeStructure, "id">);
      expect(RecipesModel.create).toHaveBeenCalled();
      expect(result).toBe('test');

    })
    test('then getAll should be called...',async ()=>{
      const exec = jest.fn().mockResolvedValue('tes');
      const populate = jest.fn().mockReturnValue({exec});
      RecipesModel.find = jest.fn().mockReturnValue({populate,exec});
      const result = await repo.getAll();
      expect(RecipesModel.find).toHaveBeenCalled();
      expect(result).toBe('tes');
    });
    test('then getById should be called...',async ()=>{
      let exec = jest.fn().mockResolvedValue('te');
      let populate = jest.fn().mockReturnValue({exec});
      RecipesModel.findById = jest.fn().mockReturnValue({populate,exec});
      const result = await repo.getById('id');
      expect(RecipesModel.findById).toHaveBeenCalled();
      expect(result).toBe('te');

      const mockError = new HttpError(404, 'Not Found', 'GetById not possible');
      exec = jest.fn().mockResolvedValue(null);
      populate = jest.fn().mockReturnValue({exec});
      RecipesModel.findById = jest.fn().mockReturnValue({populate,exec});
      const resultError = repo.getById('id');
      Auth.compare = jest.fn().mockReturnValue(false);
      expect(resultError).rejects.toThrow(mockError);
    });
    
    test('then getByIdMyRecipes should be called...',async ()=>{
      let exec = jest.fn().mockResolvedValue('testing');
      let populate = jest.fn().mockReturnValue({exec});
      UsersModel.findById = jest.fn().mockReturnValue({exec});
      RecipesModel.find = jest.fn().mockReturnValue({populate,exec});
      const result = await repo.getByIdMyRecipes('id');
      expect(UsersModel.findById).toHaveBeenCalled();
      expect(result).toBe('testing');


      const mockError = new HttpError(404, 'Not Found', 'GetById not possible');
      exec = jest.fn().mockResolvedValue(null);
      populate = jest.fn().mockReturnValue({exec});
      RecipesModel.findById = jest.fn().mockReturnValue({populate,exec});
      const resultError = repo.getById('id');
      Auth.compare = jest.fn().mockReturnValue(false);
      expect(resultError).rejects.toThrow(mockError);
    });
    test('then update should be called...',async ()=>{
      let exec = jest.fn().mockResolvedValue('tester');
      let populate = jest.fn().mockReturnValue({exec});
      RecipesModel.findByIdAndUpdate = jest.fn().mockReturnValue({populate,exec});
      const result = await repo.update('id',{});
      expect(RecipesModel.findByIdAndUpdate).toHaveBeenCalled();
      expect(result).toBe('tester');

      const mockError = new HttpError(404, 'Not Found', 'Update not possible');
      exec = jest.fn().mockResolvedValue(null);
      populate = jest.fn().mockReturnValue({exec});
      RecipesModel.findByIdAndUpdate = jest.fn().mockReturnValue({populate,exec});
      const resultError = repo.update('id',{});
      Auth.compare = jest.fn().mockReturnValue(false);
      expect(resultError).rejects.toThrow(mockError);
    });
    test('then delete should be called...',async ()=>{
      let exec = jest.fn().mockResolvedValue({});
      let populate = jest.fn().mockReturnValue({exec});
      RecipesModel.findByIdAndDelete= jest.fn().mockReturnValue({populate,exec});
      await repo.delete('id');
      expect(RecipesModel.findByIdAndDelete).toHaveBeenCalled();

      const mockError = new HttpError(404, 'Not Found', 'Delete not possible');
      exec = jest.fn().mockResolvedValue(null);
      populate = jest.fn().mockReturnValue({exec});
      RecipesModel.findByIdAndDelete = jest.fn().mockReturnValue({populate,exec});
      const resultError = repo.delete('');
      Auth.compare = jest.fn().mockReturnValue(false);
      expect(resultError).rejects.toThrow(mockError);

    });
  })

