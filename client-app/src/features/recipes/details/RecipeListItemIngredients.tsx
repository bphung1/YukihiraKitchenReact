import { observer } from "mobx-react-lite";
import React from "react";
import { Icon, List } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function RecipeListItemIngredients() {
  const { recipeStore } = useStore();
  return (
    <List className="recipe_ingredient-list">
      {recipeStore.selectedRecipe?.recipeIngredients?.map((ingredient) => (
        <List.Item key={ingredient.ingredientName}>
          <Icon name="checkmark" style={{ marginRight: "1em" }} />
          {ingredient.quantity +
            " " +
            ingredient.measurement +
            " " +
            ingredient.ingredientName}
        </List.Item>
      ))}
    </List>
  );
});
