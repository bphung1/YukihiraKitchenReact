import { Ingredient } from "./ingredient";

export interface Recipe {
  id: string;
  recipeName: string;
  description: string;
  cookingDuration: number;
  temperature: number;
  recipeIngredients?: Ingredient[];
}
