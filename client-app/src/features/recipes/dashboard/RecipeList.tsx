import React from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { Recipe } from "../../../app/models/recipe";

interface Props {
  recipes: Recipe[];
  selectRecipe: (id: string) => void;
  deleteRecipe: (id: string) => void;
}

export default function RecipeList({
  recipes,
  selectRecipe,
  deleteRecipe,
}: Props) {
  return (
    <Segment clearing>
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
                <Button
                  onClick={() => selectRecipe(recipe.id)}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  onClick={() => deleteRecipe(recipe.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
