import { UserStructure } from "../../entities/user.js";
import { Schema, model } from "mongoose";

const usersSchema = new Schema<UserStructure>({
  email:{
    type: String,
    required: true,
    unique: true
  },
  passwd:{
    type: String,
    required: true
  },
  userName:{
    type: String,
    required: true,
  },
  styleFood:{
    type: String,
    default: 'Indefinido',
  },
  descriptionUser:{
    type: String,
    default: 'Sin descripción'
  },
  myRecipes:[
    {
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
    }
  ]
})

usersSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const UsersModel = model('User', usersSchema, 'users');
