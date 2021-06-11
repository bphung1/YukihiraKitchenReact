import { observer } from "mobx-react-lite";
import React from "react";
import { Segment } from "semantic-ui-react";
import IngredientList from "./IngredientList";

export default observer(function IngredientDashboard() {
  return (
    <Segment>
      <IngredientList />
    </Segment>
  );
});
