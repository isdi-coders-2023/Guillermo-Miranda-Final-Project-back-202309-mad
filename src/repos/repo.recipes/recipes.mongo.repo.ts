import { Repository } from "../repo.js";
import { HttpError } from "../../types/http.error.js";
import { RecipesModel } from "./recipes.mongo.model.js";
import { UsersModel } from "../repo.users/users.mongo.model.js";
import { recipeStructure } from "../../entities/recipes.js";
import createDebug from 'debug'
import { UsersMongoRepo } from "../repo.users/users.mongo.repo.js";



const debug = createDebug('FPB:recipes:mongo:repo')
export class RecipesMongoRepo implements Repository<recipeStructure>{
  userRepo: UsersMongoRepo;
  constructor(){
    this.userRepo = new UsersMongoRepo();
    debug('Instantiated');
  }
  
  async create(newItem: Omit<recipeStructure, "id">): Promise<recipeStructure> {
    
    const userID = newItem.chef.id;
    const user = await this.userRepo.getById(userID);
   
    const result: recipeStructure = await RecipesModel.create({...newItem, chef: userID});
    
    user.myRecipes.push(result);
    await this.userRepo.update(userID, user);
    return result;
  
  }
 
  async getAll(): Promise<recipeStructure[]> { 

    const data = await RecipesModel.find()
    .populate('chef', {
      myRecipes: 0,
    }).exec();

    return data;

  }

  async getById(id: string): Promise<recipeStructure> {
    const result = await RecipesModel.findById(id)
    .populate('chef', {
      myRecipes: 0,
    }).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result as recipeStructure;

  }

  async getByIdMyRecipes(userID: string): Promise<recipeStructure[]> {
    const user = await UsersModel.findById(userID).exec()
    if (!user) throw new HttpError(404, 'Not Found', 'GetByIdMyRecipes not possible');
    const result = await RecipesModel.find({ _id: { $in: user.myRecipes } }).populate('chef', {
      myRecipes: 0,
    }).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'GetByIdMyRecipes not possible');
    return result as recipeStructure[]

  }
  
  async update(id: string, updatedItem: Partial<recipeStructure>): Promise<recipeStructure> {
    const result = await RecipesModel.findByIdAndUpdate(id, updatedItem, {new : true})
    .populate('chef', {
      myRecipes: 0,
    }).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result as recipeStructure;

  }

  async delete(id: string): Promise<void> {
    const result = await RecipesModel.findByIdAndDelete(id)
    .populate('chef', {
      myRecipes: 0,
    }).exec();
    if (!result){
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }
  }
}
