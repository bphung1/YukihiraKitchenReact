import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../app/stores/store";
import RecipeListItem from "./RecipeListItem";

export default observer(function RecipeList() {
  const { recipeStore } = useStore();
  const { recipesByName } = recipeStore;

  return (
    <>
      {recipesByName.map((recipe) => (
        <RecipeListItem key={recipe.id} recipe={recipe} />
      ))}
    </>
  );
});
