import { observer } from "mobx-react-lite";
import React from "react";
import { Segment } from "semantic-ui-react";
import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";

export default observer(function IngredientDashboard() {
  return (
    <Segment>
      <IngredientList />
      <IngredientForm />
    </Segment>
  );
});
