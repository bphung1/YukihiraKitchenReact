import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../app/stores/store";
import IngredientListItem from "./IngredientListItem";

export default observer(function IngredientList() {
  const { recipeStore } = useStore();
  const { selectedRecipe } = recipeStore;
  return (
    <>
      {selectedRecipe!.recipeIngredients?.map((ingredient) => (
        <IngredientListItem
          key={ingredient.ingredientName}
          ingredient={ingredient}
          id={selectedRecipe!.id}
        />
      ))}
    </>
  );
});
