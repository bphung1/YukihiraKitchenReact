import React from "react";
import { Grid, Item, List, Rail, Sticky } from "semantic-ui-react";
import { Recipe } from "../../../app/models/recipe";
import RecipeList from "./RecipeList";

interface Props {
  recipes: Recipe[];
}

export default function RecipeDashboard({ recipes }: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <RecipeList recipes={recipes} />
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
