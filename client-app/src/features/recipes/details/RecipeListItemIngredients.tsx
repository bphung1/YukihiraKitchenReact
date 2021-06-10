import { observer } from "mobx-react-lite";
import React from "react";
import { Icon, List } from "semantic-ui-react";
import { Ingredient } from "../../../app/models/ingredient";

interface Props {
  ingredients: Ingredient[];
}

export default observer(function RecipeListItemIngredients({
  ingredients,
}: Props) {
  return (
    <List selection className="recipe_ingredient-list">
      {ingredients.map((ingredient) => (
        <ul className="recipe__ingredient">
          <List.Item key={ingredient.ingredientName}>
            <Icon name="checkmark" style={{ marginRight: "1em" }} />
            {ingredient.quantity +
              " " +
              ingredient.measurement +
              " " +
              ingredient.ingredientName}
          </List.Item>
        </ul>
      ))}
    </List>
  );
});
