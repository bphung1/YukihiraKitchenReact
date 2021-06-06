import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import RecipeStore from "./recipeStore";

interface Store {
  recipeStore: RecipeStore;
  commonStore: CommonStore;
}

export const store: Store = {
  recipeStore: new RecipeStore(),
  commonStore: new CommonStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
