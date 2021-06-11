import { RecipeIngredient } from "./RecipeIngredient";

export interface Recipe {
  id: string;
  recipeName: string;
  description: string;
  cookingDuration: number;
  temperature: number;
  recipeIngredients?: RecipeIngredient[];
}

export class RecipeFormValues {
  id?: string = undefined;
  recipeName: string = "";
  description: string = "";
  cookingDuration: number = 0;
  temperature: number = 0;

  constructor(recipe?: RecipeFormValues) {
    if (recipe) {
      this.id = recipe.id;
      this.recipeName = recipe.recipeName;
      this.description = recipe.description;
      this.cookingDuration = recipe.cookingDuration;
      this.temperature = recipe.temperature;
    }
  }
}
