import React from "react";
import { Grid, Item, Sticky } from "semantic-ui-react";
import { Recipe } from "../../../app/models/recipe";
import RecipeDetails from "../details/RecipeDetails";
import RecipeForm from "../forms/RecipeForm";
import RecipeList from "./RecipeList";

interface Props {
  recipes: Recipe[];
  selectedRecipe: Recipe | undefined;
  selectRecipe: (id: string) => void;
  cancelSelectRecipe: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (recipe: Recipe) => void;
  deleteRecipe: (id: string) => void;
}

export default function RecipeDashboard({
  recipes,
  selectedRecipe,
  selectRecipe,
  cancelSelectRecipe,
  editMode,
  openForm,
  closeForm,
  createOrEdit,
  deleteRecipe,
}: Props) {
  return (
    <Grid>
      <Grid.Column width="8">
        <RecipeList
          recipes={recipes}
          selectRecipe={selectRecipe}
          deleteRecipe={deleteRecipe}
        />
      </Grid.Column>

      <Grid.Column width="6">
        {selectedRecipe && !editMode && (
          <RecipeDetails
            recipe={selectedRecipe}
            cancelSelectRecipe={cancelSelectRecipe}
            openForm={openForm}
          />
        )}
        {editMode && (
          <RecipeForm
            closeForm={closeForm}
            recipe={selectedRecipe}
            createOrEdit={createOrEdit}
          />
        )}
      </Grid.Column>

      <Grid.Column>
        <Sticky offset={100} position="absolute">
          <Item className="ui sticky">
            <img src="/assets/soma.png" alt="Soma" />
          </Item>
        </Sticky>
      </Grid.Column>
    </Grid>
  );
}
