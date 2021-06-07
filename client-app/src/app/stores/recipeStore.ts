import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Recipe } from "../models/recipe";

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
      if (a.recipeName.toUpperCase() < b.recipeName.toUpperCase()) return -1;
      if (a.recipeName.toUpperCase() > b.recipeName.toUpperCase()) return 1;
      return 0;
    });
  }

  // get groupedRecipes() {
  //   return Object.entries(
  //     this.recipesByName.reduce((recipes, recipe) => {
  //       const name = recipe.recipeName;
  //       const firstLetter = name.charAt(0);

  //       recipes[name] = recipes[name] ? [...recipes[name], recipe] : [recipe];

  //       return recipes;
  //     }, {} as { [key: string]: Recipe[] })
  //   );
  // }

  //implement once cetegory is included
  // get groupedRecipes() {
  //   return Object.entries(
  //     this.recipesByName.reduce((recipes, recipe) => {
  //       const category = recipe.category;

  //       recipes[category] = recipes[category]
  //         ? [...recipes[category], recipe]
  //         : [recipe];

  //       return recipes;
  //     }, {} as { [key: string]: Recipe[] })
  //   );
  // }

  loadRecipes = async () => {
    this.setLoadingInitial(true);
    try {
      const recipes = await agent.Recipes.list();
      recipes.forEach((recipe) => {
        this.setRecipe(recipe);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadRecipe = async (id: string) => {
    let recipe = this.getRecipe(id);
    if (recipe) {
      this.selectedRecipe = recipe;
      return recipe;
    } else {
      this.loadingInitial = true;
      try {
        recipe = await agent.Recipes.details(id);
        this.setRecipe(recipe);
        runInAction(() => {
          this.selectedRecipe = recipe;
          this.setLoadingInitial(false);
        });
        return recipe;
      } catch (error) {
        console.log(error);
        runInAction(() => {
          this.setLoadingInitial(false);
        });
      }
    }
  };

  private setRecipe = (recipe: Recipe) => {
    this.recipeRegistry.set(recipe.id, recipe);
  };

  private getRecipe = (id: string) => {
    return this.recipeRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createRecipe = async (recipe: Recipe) => {
    this.loading = true;
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
