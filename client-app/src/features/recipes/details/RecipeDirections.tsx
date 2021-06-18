import { observer } from "mobx-react-lite";
import React from "react";
import { Icon, List } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function RecipeDirections() {
  const { recipeStore } = useStore();

  return (
    <List>
      {recipeStore.selectedRecipe?.directions?.map((direction) => (
        <List.Item
          key={direction.directionId}
          className="recipe_direction-list"
        >
          <Icon name="arrow right" style={{ marginRight: "1em" }} />

          {"Step " +
            direction.cookingStepNumber +
            " - " +
            direction.cookingDirection}
        </List.Item>
      ))}
    </List>
  );
});
