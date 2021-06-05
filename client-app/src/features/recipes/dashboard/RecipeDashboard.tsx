import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import Background from "../../../app/layout/Background";
import { useStore } from "../../../app/stores/store";
import RecipeDetails from "../details/RecipeDetails";
import RecipeForm from "../forms/RecipeForm";
import RecipeList from "./RecipeList";

export default observer(function RecipeDashboard() {
  const { recipeStore } = useStore();
  const { selectedRecipe, editMode } = recipeStore;

  return (
    <Grid>
      <Grid.Column width="8">
        <RecipeList />
      </Grid.Column>

      <Grid.Column width="6">
        {selectedRecipe && !editMode && <RecipeDetails />}
        {editMode && <RecipeForm />}
        {!editMode && <Background />}
      </Grid.Column>
      {/* 
      <Grid.Column>
        <Background />
      </Grid.Column> */}
    </Grid>
  );
});
