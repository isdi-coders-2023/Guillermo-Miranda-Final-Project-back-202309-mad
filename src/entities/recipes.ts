import { UserStructure } from "./user"

export type recipeStructure = {
  
  id: string,
  chef: UserStructure,
  recipeName:string, 
  ingredients: string[],
  descriptionRecipe: string,
  cockingTime: number,
  // picture:
  diets: 'Omnivora' | 'Flexitariana' | 'Vegetariana' |'Vegana' | 'Otros'
}
