import { observer } from "mobx-react-lite";
import React from "react";
import { Segment, Grid, Icon, List } from "semantic-ui-react";
import { Recipe } from "../../../app/models/recipe";
import RecipeListItemIngredients from "./RecipeListItemIngredients";
import RecipeDirections from "./RecipeDirections";

interface Props {
  recipe: Recipe;
}

export default observer(function RecipeDetailedInfo({ recipe }: Props) {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{recipe.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>

      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="add circle" size="large" color="teal" />
          </Grid.Column>

          <Grid.Column width={15}>
            <List divided>
              <List.Item>
                <h3 style={{ color: "teal" }}>Ingredients</h3>
              </List.Item>
              <List.Item>
                <RecipeListItemIngredients />
              </List.Item>
            </List>
          </Grid.Column>
        </Grid>
      </Segment>

      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="bell outline" size="large" color="teal" />
          </Grid.Column>

          <Grid.Column width={15}>
            <List>
              <List.Item>
                <h3 style={{ color: "teal" }}>Directions</h3>
              </List.Item>
              <List.Item>
                <RecipeDirections />
              </List.Item>
            </List>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
});
