export interface Ingredient {
  id: number;
  ingredientName: string;
}

export class IngredientValues {
  ingredientName: string = "";

  constructor(ingredient: string) {
    if (ingredient) {
      this.ingredientName = ingredient;
    }
  }
}
