import { Repository } from "../repo.js";
// Import { HttpError } from "../../services/http.error.js";
import { UserModel } from "./users.mongo.model.js";
import { LoginUser, UserStructure } from "../../entities/user.js";
import createDebug from 'debug'
// Import { Auth } from "../../services/auth.js";

const debug = createDebug('FPB:users:mongo:repo')
export class UserMongoRepo implements Repository<UserStructure>{
constructor(){
  debug('Instantiated');
}

  async create(newItem: Omit<UserStructure, "id">): Promise<UserStructure> {

  // NewItem.passwd = await Auth.hash(newItem.passwd);
    const result: UserStructure = await UserModel.create(newItem);
    return result;
  }

  async login (loginUser: LoginUser): Promise<UserStructure> {
    const results = await UserModel.findOne({email: loginUser.email}).exec(); // Estto te devuelve un array por que es un metodo filtter que no sabe si te va a devolver un solo elemento o varios, hay unas variantes de  find que solo te devuelve uno y no seria un array como findOne y lo tratarias de otra manera(en vez del lenght seria solo result!)
    // If(!results ||  !(await Auth.compare(loginUser.passwd, results.passwd ))) 
    // Throw new HttpError(401, 'Unauthorized'); // Implementamos la encriptacion
    return results as UserStructure;

}
 
  async getAll(): Promise<UserStructure[]> { // Este lo hacemos por nuestra utilidad para ver los cambios que hemos implementado
    const data = await UserModel.find().exec();
    return data;
  }

  async getById(id: string): Promise<UserStructure> {
    const result = await UserModel.findById(id).exec();
    // If (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result as UserStructure;
  }
  
  
  async update(id: string, updatedItem: Partial<UserStructure>): Promise<UserStructure> {
    const result = await UserModel.findByIdAndUpdate(id, updatedItem, {new : true}).exec();
  // If (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result as UserStructure;
  }

  async delete(id: string): Promise<void> { 
    const result = await UserModel.findByIdAndDelete(id).exec();
    
    if (!result){
    // Throw new HttpError(404, 'Not Found', 'Delete not possible');
    }
  }
  
}
