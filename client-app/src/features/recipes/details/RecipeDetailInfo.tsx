import { observer } from "mobx-react-lite";
import React from "react";
import { Segment, Grid, Icon } from "semantic-ui-react";
import { Recipe } from "../../../app/models/recipe";

interface Props {
  recipe: Recipe;
}

export default observer(function ActivityDetailedInfo({ recipe }: Props) {
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
            <span>Ingredients</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="bell outline" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>Direction</span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
});
