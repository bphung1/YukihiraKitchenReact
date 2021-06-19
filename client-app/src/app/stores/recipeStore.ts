import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Direction } from "../models/direction";
import { Recipe, RecipeFormValues } from "../models/recipe";
import { RecipeIngredient } from "../models/RecipeIngredient";

export default class RecipeStore {
  recipeRegistry = new Map<string, Recipe>();
  selectedRecipe: Recipe | undefined = undefined;
  selectedIngredient: RecipeIngredient | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;
  uploading = false;
  directionLoading = false;
  directionFormLoading = false;

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

  setEditMode = (edit: boolean) => {
    this.editMode = edit;
  };

  loadRecipe = async (id: string) => {
    let recipe = this.getRecipe(id);
    this.editMode = true;
    if (recipe) {
      this.selectedRecipe = recipe;
      if (this.selectedRecipe.directions) {
        this.selectedRecipe.directions = this.sortDirections;
      }
      return recipe;
    } else {
      this.loadingInitial = true;
      try {
        recipe = await agent.Recipes.details(id);
        this.setRecipe(recipe);
        runInAction(() => {
          this.selectedRecipe = recipe;
          if (this.selectedRecipe!.directions) {
            this.selectedRecipe!.directions = this.sortDirections;
          }
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

  get sortDirections() {
    return Array.from(this.selectedRecipe!.directions!.values()).sort(
      (a, b) => {
        if (a.cookingStepNumber < b.cookingStepNumber) return -1;
        if (a.cookingStepNumber > b.cookingStepNumber) return 1;
        return 0;
      }
    );
  }

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
      recipe.recipeIngredients = [];
      await agent.Recipes.create(recipe);
      runInAction(() => {
        this.recipeRegistry.set(recipe.id, recipe);
        this.selectedRecipe = recipe;
        this.editMode = true;
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

  createRecipeIngredient = async (id: string, ingredient: RecipeIngredient) => {
    this.loading = true;
    ingredient.ingredientName = this.capitalizeFirstLetter(
      ingredient.ingredientName
    );
    try {
      await agent.RecipeIngredients.create(id, ingredient);
      runInAction(() => {
        this.selectedRecipe?.recipeIngredients?.push(ingredient);
        this.loading = false;
      });
    } catch (err) {
      console.log(err);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  private capitalizeFirstLetter(name: string) {
    name = name[0].toUpperCase() + name.substring(1);
    return name;
  }

  deleteIngredient = async (id: string, ingredientName: string) => {
    this.loading = true;
    try {
      await agent.RecipeIngredients.delete(id, ingredientName);
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

  createDirection = async (id: string, direction: Direction) => {
    this.directionFormLoading = true;
    try {
      await agent.Directions.create(id, direction);
      const recipe = await agent.Recipes.details(id);
      runInAction(() => {
        this.selectedRecipe!.directions = recipe.directions;
        this.selectedRecipe!.directions = this.sortDirections;
        this.directionFormLoading = false;
      });
    } catch (err) {
      console.log(err);
      runInAction(() => (this.directionFormLoading = false));
    }
  };

  deleteDirection = async (id: string) => {
    this.directionLoading = true;
    try {
      await agent.Directions.delete(id);
      runInAction(() => {
        if (this.selectedRecipe) {
          this.selectedRecipe.directions =
            this.selectedRecipe.directions?.filter((d) => d.directionId !== id);
        }
        this.directionLoading = false;
      });
    } catch (err) {
      console.log(err);
      runInAction(() => (this.directionLoading = false));
    }
  };

  uploadPhoto = async (file: Blob, id: string) => {
    this.uploading = true;
    try {
      const response = await agent.Recipes.uploadPhoto(file, id);
      const photo = response.data;
      runInAction(() => {
        if (this.selectedRecipe) {
          this.selectedRecipe.photo = photo.url;
          this.uploading = false;
        }
      });
    } catch (err) {
      console.log(err);
      runInAction(() => (this.uploading = false));
    }
  };

  replacePhoto = async (file: Blob, id: string) => {
    this.uploading = true;
    try {
      const response = await agent.Recipes.replacePhoto(file, id);
      const photo = response.data;
      runInAction(() => {
        if (this.selectedRecipe) {
          this.selectedRecipe.photo = photo.url;
          this.uploading = false;
        }
      });
    } catch (err) {
      console.log(err);
      runInAction(() => (this.uploading = false));
    }
  };

  deletePhoto = async (id: string) => {
    this.uploading = true;
    try {
      await agent.Recipes.deletePhoto(id);
      runInAction(() => {
        if (this.selectedRecipe) {
          this.selectedRecipe.photo = undefined;
          this.uploading = false;
        }
      });
    } catch (err) {
      console.log(err);
      runInAction(() => (this.uploading = false));
    }
  };
}
