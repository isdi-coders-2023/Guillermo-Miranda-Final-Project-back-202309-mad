import { recipeStructure } from "../../entities/recipes.js";
import { Schema, model } from "mongoose";

const RecipesSchema = new Schema<recipeStructure>({
  chef:{
    type: Schema.Types.ObjectId,
    ref: 'UserStructure',
  },
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

RecipesSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const RecipesModel = model('Recipe', RecipesSchema, 'recipes');
