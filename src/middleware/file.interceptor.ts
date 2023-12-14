import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import createDebug from 'debug';


const debug = createDebug('FPB:MIDDLEWARE:FILE');

export class FileInterceptor {

  
  singleFileStore(fileName = 'file', fileSize = 10_000_000) {
    const options: multer.Options = {
      storage: multer.diskStorage({
        destination: './public/upload',
        filename(_req, file, callback) {
          const date = Date.now();
          callback(null, date + '-' + file.originalname);
        },
      }),
      limits: { fileSize },
    };

    const middleware = multer(options).single(fileName);

    return (req: Request, res: Response, next: NextFunction) => {
      debug('image',req.body)
      const previousBody = req.body;
      debug('previousBody:', previousBody);
      middleware(req, res, next);
      debug('multer-body:', req.body);
      req.body = { ...previousBody, ...req.body };
      debug('final-body:', req.body);
    };
  }
}
