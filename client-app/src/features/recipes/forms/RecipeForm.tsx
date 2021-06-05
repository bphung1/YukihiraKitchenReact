import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function RecipeForm() {
  const { recipeStore } = useStore();
  const { selectedRecipe, closeForm, createRecipe, updateRecipe, loading } =
    recipeStore;

  const initialState = selectedRecipe ?? {
    id: "",
    recipeName: "",
    description: "",
    cookingDuration: 0,
    temperature: 0,
  };

  const [recipe, setRecipe] = useState(initialState);

  function handleSubmit() {
    recipe.id ? updateRecipe(recipe) : createRecipe(recipe);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  }

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
          value={recipe.cookingDuration}
          name="cookingDuration"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Temperature"
          value={recipe.temperature}
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
          onClick={closeForm}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
});
