import { observer } from "mobx-react-lite";
import React from "react";
import { Item } from "semantic-ui-react";
import { Recipe } from "../../app/models/recipe";
import IngredientForm from "./IngredientForm";
import IngredientListItem from "./IngredientListItem";

interface Props {
  recipe: Recipe;
}

export default observer(function IngredientList({ recipe }: Props) {
  return (
    <>
      {recipe.recipeIngredients?.map((ingredient) => (
        <IngredientListItem
          key={ingredient.ingredientName}
          ingredient={ingredient}
          recipe={recipe}
        />
      ))}
      <Item>
        <IngredientForm recipe={recipe} />
      </Item>
    </>
  );
});
