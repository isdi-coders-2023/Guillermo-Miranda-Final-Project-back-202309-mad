export type recipeStructure = {
  
  id: string,
  recipeName:string, 
  ingredients: string,
  descriptionRecipe: string,
  cockingTime: number,
  // picture:
  diets: 'omnivora' | 'flexitariana' | 'vegetariana' |'vegana' 
}
