export interface RecipeIngredient {
  ingredientName: string;
  quantity: number;
  measurement: string;
}

export class RecipeIngredientFormValues {
  ingredientName: string = "";
  quantity: number = 0;
  measurement: string = "";
}
