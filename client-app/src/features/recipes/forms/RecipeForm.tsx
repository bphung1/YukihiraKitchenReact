import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Recipe } from "../../../app/models/recipe";

interface Props {
  recipe: Recipe | undefined;
  closeForm: () => void;
  createOrEdit: (recipe: Recipe) => void;
}

export default function RecipeForm({
  recipe: selectedRecipe,
  closeForm,
  createOrEdit,
}: Props) {
  const initialState = selectedRecipe ?? {
    id: "",
    recipeName: "",
    description: "",
    cookingDuration: 0,
    temperature: 0,
  };

  const [recipe, setRecipe] = useState(initialState);

  function handleSubmit() {
    createOrEdit(recipe);
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
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={closeForm}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
}
