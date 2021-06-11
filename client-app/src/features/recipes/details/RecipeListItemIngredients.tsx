import { observer } from "mobx-react-lite";
import React from "react";
import { Icon, List } from "semantic-ui-react";
import { RecipeIngredient } from "../../../app/models/RecipeIngredient";

interface Props {
  ingredients: RecipeIngredient[];
}

export default observer(function RecipeListItemIngredients({
  ingredients,
}: Props) {
  return (
    <List className="recipe_ingredient-list">
      {ingredients.map((ingredient) => (
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
