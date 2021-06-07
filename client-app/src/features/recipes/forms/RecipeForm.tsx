import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyNumberInput from "../../../app/common/form/MyNumberInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { Recipe } from "../../../app/models/recipe";

export default observer(function RecipeForm() {
  const history = useHistory();
  const { recipeStore } = useStore();
  const { createRecipe, updateRecipe, loading, loadRecipe, loadingInitial } =
    recipeStore;
  const { id } = useParams<{ id: string }>();

  const [recipe, setRecipe] = useState<Recipe>({
    id: "",
    recipeName: "",
    description: "",
    cookingDuration: 0,
    temperature: 0,
  });

  const validationSchema = Yup.object({
    recipeName: Yup.string().required("The recipe name is required"),
    description: Yup.string().required("The recipe description is required"),
    temperature: Yup.number()
      .integer("The recipe's cooking temperature must be an integer")
      .required("The recipe's cooking temperature requires a number")
      .positive("The recipe's cooking temperature must be positive")
      .typeError("The recipe's cooking temperature requires a number"),
    cookingDuration: Yup.number()
      .integer("The recipe's cooking duration must be an integer")
      .required("The recipe's cooking duration requires a number")
      .positive("The recipe's cooking duration must be positive")
      .typeError("The recipe's cooking duration requires a number"),
  });

  useEffect(() => {
    if (id) loadRecipe(id).then((recipe) => setRecipe(recipe!));
  }, [id, loadRecipe]);

  function handleFormSubmit(recipe: Recipe) {
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

  if (loadingInitial) return <LoadingComponent />;

  return (
    <Segment clearing>
      <Header content="Recipe Details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={recipe}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="recipeName" placeholder="Recipe name" />

            <MyTextArea rows={3} placeholder="Description" name="description" />

            <MyNumberInput
              placeholder="Cooking Duration"
              name="cookingDuration"
            />

            <MyNumberInput placeholder="Temperature" name="temperature" />

            <Header content="Recipe Ingredients" sub color="teal" />
            <Header content="Recipe Directions" sub color="teal" />

            <Button
              disabled={isSubmitting || !dirty || !isValid}
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
        )}
      </Formik>
    </Segment>
  );
});
