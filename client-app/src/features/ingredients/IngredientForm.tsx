import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import {
  RecipeIngredient,
  RecipeIngredientFormValues,
} from "../../app/models/RecipeIngredient";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button, Form, Segment } from "semantic-ui-react";
import MyNumberInput from "../../app/common/form/MyNumberInput";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import { IngredientValues } from "../../app/models/ingredient";
import MySelectInput from "../../app/common/form/MySelectInput";
import { measurementUnitOptions } from "../../app/common/options/measurementUnitOptions";

export default observer(function IngredientForm() {
  const { recipeStore, ingredientStore } = useStore();
  const [ingredientForm, setIngredientForm] =
    useState<RecipeIngredientFormValues>(new RecipeIngredientFormValues());

  const { createIngredient, ingredients } = ingredientStore;
  const { selectedRecipe, createRecipeIngredient, loading } = recipeStore;

  useEffect(() => {
    setIngredientForm(new RecipeIngredientFormValues());
  }, [setIngredientForm]);

  const validationSchema = Yup.object({
    quantity: Yup.number()
      .integer()
      .required()
      .positive()
      .typeError("Must be a number"),
    ingredientName: Yup.string().required(),
    measurement: Yup.string().required(),
  });

  function handleFormSubmit(ingredient: RecipeIngredient) {
    if (!ingredients?.includes(ingredient.ingredientName)) {
      const ing = new IngredientValues(ingredient.ingredientName);
      createIngredient(ing).then(() =>
        createRecipeIngredient(selectedRecipe!.id, ingredient)
      );
    } else {
      createRecipeIngredient(selectedRecipe!.id, ingredient);
    }
  }

  return (
    <Segment>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={ingredientForm}
        onSubmit={(values, { resetForm }) => {
          handleFormSubmit(values);
          resetForm({});
        }}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Group>
              <MyNumberInput name="quantity" placeholder="Quantity" />

              <MySelectInput
                options={measurementUnitOptions}
                name="measurement"
                placeholder="Measurement"
              />

              <MyTextInput
                placeholder="Ingredient Name"
                name="ingredientName"
              />

              <Button
                disabled={isSubmitting || !dirty || !isValid}
                loading={loading}
                floated="right"
                positive
                type="submit"
                content="Add"
              />
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
