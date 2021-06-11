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

export default observer(function IngredientForm() {
  const { recipeStore } = useStore();
  const [ingredientForm, setIngredientForm] =
    useState<RecipeIngredientFormValues>(new RecipeIngredientFormValues());

  const { selectedRecipe, createIngredient, loading } = recipeStore;

  useEffect(() => {
    setIngredientForm(new RecipeIngredientFormValues());
  }, [setIngredientForm]);

  const validationSchema = Yup.object({
    quantity: Yup.number().required(),
    ingredientName: Yup.string().required(),
    measurement: Yup.string().required(),
  });

  function handleFormSubmit(ingredient: RecipeIngredient) {
    createIngredient(selectedRecipe!.id, ingredient);
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

              <MyTextInput name="measurement" placeholder="Measurement" />

              <Form.Input>
                <MyTextInput
                  placeholder="Ingredient Name"
                  name="ingredientName"
                />
              </Form.Input>

              <Button
                disabled={isSubmitting || !dirty || !isValid}
                loading={loading}
                floated="right"
                positive
                type="submit"
                content="Add"
                style={{ marginTop: "1em" }}
              />
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
