import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import RecipeDetailHeader from "./RecipeDetailHeader";
import RecipeDetailInfo from "./RecipeDetailInfo";

interface Props {
  id: string;
}

export default observer(function RecipeDetails({ id }: Props) {
  const { recipeStore } = useStore();
  const { selectedRecipe: recipe, loadRecipe, loadingInitial } = recipeStore;
  // const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadRecipe(id);
  }, [id, loadRecipe]);

  if (loadingInitial || !recipe) return <LoadingComponent />;

  return (
    <Grid centered className="modalRecipe">
      <Grid.Column width={12}>
        <RecipeDetailHeader recipe={recipe} />
        <RecipeDetailInfo recipe={recipe} />
      </Grid.Column>
    </Grid>
  );
});
