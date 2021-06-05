import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function RecipeDetails() {
  const { recipeStore } = useStore();
  const { selectedRecipe: recipe, loadRecipe, loadingInitial } = recipeStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadRecipe(id);
  }, [id, loadRecipe]);

  if (loadingInitial || !recipe) return <LoadingComponent />;

  return (
    <Card fluid>
      <Image
        src={`/assets/pizza.png`}
        style={{ height: "500px", width: "1150px" }}
      />
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
            as={Link}
            to={`/manage/${recipe.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button as={Link} to="/recipes" basic color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
});
