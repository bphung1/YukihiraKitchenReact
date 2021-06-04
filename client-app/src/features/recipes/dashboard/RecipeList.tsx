import React from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { Recipe } from "../../../app/models/recipe";

interface Props {
  recipes: Recipe[];
}

export default function RecipeList({ recipes }: Props) {
  return (
    <Segment>
      <Item.Group divided>
        {recipes.map((recipe) => (
          <Item key={recipe.id}>
            <Item.Content>
              <Item.Header as="a">{recipe.recipeName}</Item.Header>
              <Item.Meta>Description</Item.Meta>
              <Item.Description>
                <div>{recipe.description}</div>
              </Item.Description>
              <Item.Extra>
                <Button floated="right" content="View" color="blue" />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
