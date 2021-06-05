import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";

export default observer(function RecipeForm() {
  const history = useHistory();
  const { recipeStore } = useStore();
  const { createRecipe, updateRecipe, loading, loadRecipe, loadingInitial } =
    recipeStore;
  const { id } = useParams<{ id: string }>();

  const [recipe, setRecipe] = useState({
    id: "",
    recipeName: "",
    description: "",
    cookingDuration: 0,
    temperature: 0,
  });

  useEffect(() => {
    if (id) loadRecipe(id).then((recipe) => setRecipe(recipe!));
  }, [id, loadRecipe]);

  function handleSubmit() {
    if (recipe.id.length === 0) {
      let newRecipe = {
        ...recipe,
        id: uuid(),
      };
      createRecipe(newRecipe).then(() =>
        history.push(`/recipes/${newRecipe.id}`)
      );
    } else {
      updateRecipe(recipe).then(() => history.push(`/recipes/${recipe.id}`));
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  }

  if (loadingInitial) return <LoadingComponent />;

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Recipe Name"
          value={recipe.recipeName}
          name="recipeName"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Description"
          value={recipe.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Cooking Duration"
          value={recipe.cookingDuration === 0 ? "" : recipe.cookingDuration}
          name="cookingDuration"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Temperature"
          value={recipe.temperature === 0 ? "" : recipe.temperature}
          name="temperature"
          onChange={handleInputChange}
        />
        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          as={Link}
          to="/recipes"
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
});
