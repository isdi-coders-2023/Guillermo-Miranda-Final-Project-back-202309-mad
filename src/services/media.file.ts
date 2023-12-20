/* eslint-disable camelcase */
import { v2 as cloudinary } from 'cloudinary';
import createDebug from 'debug';
import { ImgData } from '../types/img.data';
import { HttpError } from '../types/http.error.js';

const debug = createDebug('FPB:SERVICE:CLOUDINARY-MEDIA-FILES');


export class CloudinaryMediaFiles {
  constructor() {
    cloudinary.config({
      secure: true,
    });
    debug('Instantiated: CloudinaryMediaFiles');
    debug('key', cloudinary.config().api_key);
  }

  async uploadImage (imagePath: string) {
   
    try {
      const uploadApiResponse = await cloudinary.uploader.upload(imagePath, {

        use_filename: true,
        unique_filename: false,
        overwrite: true,

      });

      const imgData: ImgData = {
        url: uploadApiResponse.url,
        publicId: uploadApiResponse.public_id,
        size: uploadApiResponse.bytes,
        width: uploadApiResponse.width,
        height: uploadApiResponse.height,
        format: uploadApiResponse.format,
      };
     
      return imgData;
    } catch (err) {
      const error = (err as { error: Error }).error as Error;
      throw new HttpError(
        406,
        'Error uploading image to Cloudinary',
        (error as Error).message
      );
    }
  };
}
