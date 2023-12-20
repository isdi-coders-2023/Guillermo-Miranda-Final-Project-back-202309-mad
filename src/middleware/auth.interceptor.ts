import createDebug from "debug";
import { NextFunction, Request, Response } from "express";
import { HttpError } from "../types/http.error.js";
import { Auth } from "../services/auth.js";
import { RecipesMongoRepo } from "../repos/repo.recipes/recipes.mongo.repo.js";
import { UsersMongoRepo } from "../repos/repo.users/users.mongo.repo.js";



const debug = createDebug('FPB:auth:interceptor')

export class AuthInterceptor {
  constructor(){
    debug('Instantiated');
  }

    authorization(req: Request, res: Response, next: NextFunction ){
    
      try{ 
        const tokenHeader = req.get('Authorization');
        if(!tokenHeader?.startsWith('Bearer')) 
          throw new HttpError(401, 'Unauthorized');
        const token = tokenHeader.split(' ')[1]
        const tokenPayload = Auth.verifyAndGetPayload(token);
          req.body.userid = tokenPayload.id;
          next();
      } catch(error){
        next(error)
      }
    }

    async authenticationRecipe (req: Request, res: Response, next: NextFunction){
      try{ 
        const userID: string = req.body.userid;
        const recipeID = req.params.id
        const repoRecipe = new RecipesMongoRepo(); 
        const recipe = await repoRecipe.getById(recipeID) 
        if(recipe.chef.id !== userID) throw new HttpError(401, 'Unauthorized', 'User not valid') 

        next();
      }catch(error){
        next(error)
      }
    }
  

  async authenticationUser (req: Request, res: Response, next: NextFunction){
  try{ 
 
    const userID = req.body.userid; 
    debug('Instantiated',userID);
    const userTargetID = req.params.id;

    const repoUser = new UsersMongoRepo(); 
    const user = await repoUser.getById(userTargetID);
    if(user.id !== userID) throw new HttpError(401, 'Unauthorized', 'User not valid')

    next();
  }catch(error){
    next(error)
  }
  }
}
