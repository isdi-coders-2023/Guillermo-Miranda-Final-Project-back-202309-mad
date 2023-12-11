import { recipeStructure } from "../../entities/recipes.js";
import { Schema, model } from "mongoose";

const recipesSchema = new Schema<recipeStructure>({
  recipeName:{
    type: String,
    required: true,
    unique: true
  },
  ingredients:{
    type: [],
    required: true
  },
  descriptionRecipe:{
    type: String,
    required: true,
  },
  cockingTime:{
    type: Number,
    default: 0,
  },
  diets:{
    type: String,
    default: 'Otros'
  }
})

recipesSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const UsersModel = model('Recipe', recipesSchema, 'recipes');
