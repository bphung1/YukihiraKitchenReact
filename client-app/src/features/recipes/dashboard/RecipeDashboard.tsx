import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid, Rail } from "semantic-ui-react";
import Background from "../../../app/layout/Background";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import RecipeFilter from "./RecipeFilter";
import RecipeList from "./RecipeList";

export default observer(function RecipeDashboard() {
  const { recipeStore } = useStore();
  const { loadRecipes, recipeRegistry } = recipeStore;

  useEffect(() => {
    if (recipeRegistry.size <= 1) loadRecipes();
  }, [loadRecipes, recipeRegistry]);

  if (recipeStore.loadingInitial) return <LoadingComponent />;

  return (
    <>
      <Grid>
        <Grid.Column width="8">
          <RecipeList />
          <Rail position="right">
            <RecipeFilter />
            <Background />
          </Rail>
        </Grid.Column>
      </Grid>
    </>
  );
});
