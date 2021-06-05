import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Recipe } from "../models/recipe";
import { v4 as uuid } from "uuid";

export default class RecipeStore {
  recipeRegistry = new Map<string, Recipe>();
  selectedRecipe: Recipe | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get recipesByName() {
    return Array.from(this.recipeRegistry.values()).sort((a, b) => {
      if (a.recipeName < b.recipeName) return -1;
      if (a.recipeName > b.recipeName) return 1;
      return 0;
    });
  }

  loadRecipes = async () => {
    this.setLoadingInitial(true);
    try {
      const recipes = await agent.Recipes.list();
      recipes.forEach((recipe) => {
        this.recipeRegistry.set(recipe.id, recipe);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  selectRecipe = (id: string) => {
    this.selectedRecipe = this.recipeRegistry.get(id);
  };

  cancelSelectedRecipe = () => {
    this.selectedRecipe = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectRecipe(id) : this.cancelSelectedRecipe();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createRecipe = async (recipe: Recipe) => {
    this.loading = true;
    recipe.id = uuid();
    try {
      await agent.Recipes.create(recipe);
      runInAction(() => {
        this.recipeRegistry.set(recipe.id, recipe);
        this.selectedRecipe = recipe;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateRecipe = async (recipe: Recipe) => {
    this.loading = true;
    try {
      await agent.Recipes.update(recipe);
      runInAction(() => {
        this.recipeRegistry.set(recipe.id, recipe);
        this.selectedRecipe = recipe;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteRecipe = async (id: string) => {
    this.loading = true;
    try {
      await agent.Recipes.delete(id);
      runInAction(() => {
        this.recipeRegistry.delete(id);
        if (this.selectedRecipe?.id === id) this.cancelSelectedRecipe();
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
