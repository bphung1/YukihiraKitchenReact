import { observer } from "mobx-react-lite";
import React from "react";
import { Segment } from "semantic-ui-react";
import { Recipe } from "../../app/models/recipe";
import IngredientList from "./IngredientList";

interface Props {
  recipe: Recipe;
}

export default observer(function IngredientDashboard({ recipe }: Props) {
  return (
    <Segment>
      <IngredientList recipe={recipe} />
    </Segment>
  );
});
