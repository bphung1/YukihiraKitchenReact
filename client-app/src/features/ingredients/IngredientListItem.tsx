import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { Recipe } from "../../app/models/recipe";
import { RecipeIngredient } from "../../app/models/RecipeIngredient";
import { useStore } from "../../app/stores/store";

interface Props {
  ingredient: RecipeIngredient;
  recipe: Recipe;
}

export default observer(function IngredientList({ ingredient, recipe }: Props) {
  const [target, setTarget] = useState("");
  const { ingredientStore } = useStore();
  const { deleteRecipe, loading } = ingredientStore;

  function handleDeleteIngredient(
    e: SyntheticEvent<HTMLButtonElement>,
    ingredientName: string
  ) {
    setTarget(e.currentTarget.name);
    deleteRecipe(recipe.id, ingredientName);
  }

  return (
    <>
      <Segment clearing>
        <Item key={ingredient.ingredientName} style={{ textAlign: "middle" }}>
          {ingredient.quantity +
            " " +
            ingredient.measurement +
            " " +
            ingredient.ingredientName}
          <Button
            name={ingredient.ingredientName}
            loading={loading && target === ingredient.ingredientName}
            onClick={(e) =>
              handleDeleteIngredient(e, ingredient.ingredientName)
            }
            content="Delete"
            color="red"
            floated="right"
          />
        </Item>
      </Segment>
    </>
  );
});
