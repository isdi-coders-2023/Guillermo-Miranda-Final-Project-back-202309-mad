import { Repository } from "../repo.js";
import { HttpError } from "../../types/http.error.js";
import { UsersModel } from "./users.mongo.model.js";
import { LoginUser, UserStructure } from "../../entities/user.js";
import createDebug from 'debug'
import { Auth } from "../../services/auth.js";

const debug = createDebug('FPB:users:mongo:repo')
export class UsersMongoRepo implements Repository<UserStructure>{
constructor(){
  debug('Instantiated');
}

  async create(newItem: Omit<UserStructure, "id">): Promise<UserStructure> {

    newItem.passwd = await Auth.hash(newItem.passwd);
    const result: UserStructure = await UsersModel.create(newItem);
    return result;

  }

  async login (loginUser: LoginUser): Promise<UserStructure> {

    const results = await UsersModel.findOne({email: loginUser.email}).exec(); 
    if(!results ||  !(await Auth.compare(loginUser.passwd, results.passwd ))) 
    throw new HttpError(401, 'Unauthorized'); 
    return results as UserStructure;

}
 
async getAll(): Promise<UserStructure[]> { 

  const data = await UsersModel.find().exec();
  return data;

}

  async getById(id: string): Promise<UserStructure> {
    
    const result = await UsersModel.findById(id).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result as UserStructure;

  }
  
  async update(id: string, updatedItem: Partial<UserStructure>): Promise<UserStructure> {
    const result = await UsersModel.findByIdAndUpdate(id, updatedItem, {new : true}).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result as UserStructure;

  }

  async delete(id: string): Promise<void> { 
    const result = await UsersModel.findByIdAndDelete(id).exec();
    
    if (!result){
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }
  }  
}
