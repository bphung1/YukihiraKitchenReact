import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Ingredient, IngredientValues } from "../models/ingredient";

export default class ingredientStore {
  loading = false;
  ingredientRegistry: Ingredient | undefined = undefined;
  ingredients: string[] | undefined = [];

  constructor() {
    makeAutoObservable(this);
  }

  loadIngredients = async () => {
    this.loading = true;
    try {
      const ingredients = await agent.Ingredients.list();
      ingredients.forEach((ingredient) => {
        this.ingredients?.push(ingredient.ingredientName);
      });
      this.loading = false;
    } catch (err) {
      console.log(err);
      this.loading = false;
    }
  };

  createIngredient = async (ingredient: IngredientValues) => {
    this.loading = true;
    try {
      ingredient.ingredientName = this.capitalizeFirstLetter(
        ingredient.ingredientName
      );
      await agent.Ingredients.create(ingredient);
      runInAction(() => {
        this.ingredients?.push(ingredient.ingredientName);
        this.loading = false;
      });
    } catch (err) {
      console.log(err);
      runInAction(() => (this.loading = false));
    }
  };

  private capitalizeFirstLetter(name: string) {
    name = name[0].toUpperCase() + name.substring(1);
    return name;
  }
}
