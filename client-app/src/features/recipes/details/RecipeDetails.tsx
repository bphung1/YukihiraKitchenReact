import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Recipe } from "../../../app/models/recipe";

interface Props {
  recipe: Recipe;
  cancelSelectRecipe: () => void;
  openForm: (id: string) => void;
}

export default function RecipeDetails({
  recipe,
  cancelSelectRecipe,
  openForm,
}: Props) {
  return (
    <Card fluid>
      <Image src={`/assets/pizza.png`} />
      <Card.Content>
        <Card.Header>{recipe.recipeName}</Card.Header>
        <Card.Meta>
          <span>Description</span>
        </Card.Meta>
        <Card.Description>{recipe.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            onClick={() => openForm(recipe.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={cancelSelectRecipe}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}