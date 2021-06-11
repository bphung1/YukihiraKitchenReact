import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { RecipeIngredient } from "../models/RecipeIngredient";

export default class IngredientStore {
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  createIngredient = async (id: string, ingredient: RecipeIngredient) => {
    this.loading = true;
    try {
      await agent.Ingredients.create(id, ingredient);
      runInAction(() => {
        this.loading = false;
      });
    } catch (err) {
      console.log(err);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
