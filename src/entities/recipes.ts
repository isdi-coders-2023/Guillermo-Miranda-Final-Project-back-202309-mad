export type recipeStructure = {
  
  id: string,
  recipeName:string, 
  ingredients: string[],
  descriptionRecipe: string,
  cockingTime: number,
  // picture:
  diets: 'Omnivora' | 'Flexitariana' | 'Vegetariana' |'Vegana' | 'Otros'
}
