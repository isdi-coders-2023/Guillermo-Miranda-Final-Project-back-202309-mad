import createDebug from "debug";
import { NextFunction, Request, Response } from "express";
import { HttpError } from "../types/http.error.js";
import { Auth } from "../services/auth.js";



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
  

  //   async authenticationUser (req: Request, res: Response, next: NextFunction){
  //   try{ 
  //     const userID = req.body.userId; 
  //     const userTargetID = req.params.id

  //     const repoUser = new UsersMongoRepo(); 
  //     const user = await repoUser.getById(userTargetID)
  //     if(user !== userID) throw new HttpError(401, 'Unauthorized', 'User not valid')

  //     next();
  //   }catch(error){
  //     next(error)
  //   }
  // }
}
