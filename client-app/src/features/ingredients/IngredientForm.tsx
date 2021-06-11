import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { RecipeIngredient } from "../../app/models/RecipeIngredient";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button, Form } from "semantic-ui-react";
import MyNumberInput from "../../app/common/form/MyNumberInput";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Recipe } from "../../app/models/recipe";

interface Props {
  recipe: Recipe;
}

export default observer(function IngredientForm({ recipe }: Props) {
  // const [ingredient, setIngredient] = useState<RecipeIngredient>({
  //   ingredientName: "",
  //   quantity: 0,
  //   measurement: "",
  // });

  const validationSchema = Yup.object({
    quantity: Yup.number().required(),
    ingredientName: Yup.string().required(),
    measurement: Yup.string().required(),
  });

  function handleFormSubmit(recipe: Recipe) {}

  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={recipe}
      onSubmit={(values) => handleFormSubmit(values)}
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
          </Form.Group>

          <Button
            disabled={isSubmitting || !dirty || !isValid}
            // loading={loading}
            floated="right"
            positive
            type="submit"
            content="Add"
            style={{ marginTop: "1em" }}
          />
        </Form>
      )}
    </Formik>
  );
});
