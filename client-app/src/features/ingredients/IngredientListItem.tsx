import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { RecipeIngredient } from "../../app/models/RecipeIngredient";
import { useStore } from "../../app/stores/store";

interface Props {
  ingredient: RecipeIngredient;
  id: string;
}

export default observer(function IngredientList({ ingredient, id }: Props) {
  const [target, setTarget] = useState("");
  const { recipeStore } = useStore();
  const { deleteIngredient, loading } = recipeStore;

  function handleDeleteIngredient(
    e: SyntheticEvent<HTMLButtonElement>,
    ingredientName: string
  ) {
    setTarget(e.currentTarget.name);
    deleteIngredient(id, ingredientName);
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
