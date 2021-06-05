import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import Background from "../../../app/layout/Background";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import RecipeList from "./RecipeList";

export default observer(function RecipeDashboard() {
  const { recipeStore } = useStore();
  const { loadRecipes, recipeRegistry } = recipeStore;

  useEffect(() => {
    if (recipeRegistry.size <= 1) loadRecipes();
  }, [loadRecipes, recipeRegistry]);

  if (recipeStore.loadingInitial) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width="8">
        <RecipeList />
      </Grid.Column>

      <Grid.Column width="6">
        <Background />
      </Grid.Column>
    </Grid>
  );
});
