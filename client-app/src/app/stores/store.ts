import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import DirectionStore from "./directionStore";
import IngredientStore from "./ingredientStore";
import ModalStore from "./modalStore";
import RecipeStore from "./recipeStore";
import UserStore from "./userStore";

interface Store {
  recipeStore: RecipeStore;
  commonStore: CommonStore;
  userStore: UserStore;
  modalStore: ModalStore;
  ingredientStore: IngredientStore;
  directionStore: DirectionStore;
}

export const store: Store = {
  recipeStore: new RecipeStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
  ingredientStore: new IngredientStore(),
  directionStore: new DirectionStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
