import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Recipe, RecipeFormValues } from "../models/recipe";
import { RecipeIngredient } from "../models/RecipeIngredient";

export default class RecipeStore {
  recipeRegistry = new Map<string, Recipe>();
  selectedRecipe: Recipe | undefined = undefined;
  ingredients: RecipeIngredient[] | undefined = [];
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
          this.ingredients = recipe?.recipeIngredients;
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

  updateRecipe = async (recipe: RecipeFormValues) => {
    try {
      await agent.Recipes.update(recipe);
      runInAction(() => {
        if (recipe.id) {
          let updatedActivity = { ...this.getRecipe(recipe.id), ...recipe };
          this.recipeRegistry.set(recipe.id, updatedActivity as Recipe);
          this.selectedRecipe = updatedActivity as Recipe;
        }
      });
    } catch (error) {
      console.log(error);
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

  deleteIngredient = async (id: string, ingredientName: string) => {
    this.loading = true;
    try {
      await agent.Ingredients.delete(id, ingredientName);
      runInAction(() => {
        if (this.selectedRecipe) {
          this.selectedRecipe.recipeIngredients =
            this.selectedRecipe.recipeIngredients?.filter(
              (i) => i.ingredientName !== ingredientName
            );
        }
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
