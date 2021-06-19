import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button, Form, Segment } from "semantic-ui-react";
import MyNumberInput from "../../app/common/form/MyNumberInput";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import { Direction, DirectionFormValues } from "../../app/models/direction";

export default observer(function IngredientForm() {
  const { recipeStore } = useStore();
  const [directionForm, setDirectionForm] = useState<DirectionFormValues>(
    new DirectionFormValues()
  );
  const { selectedRecipe, createDirection, directionFormLoading } = recipeStore;

  useEffect(() => {
    setDirectionForm(new DirectionFormValues());
  }, [setDirectionForm]);

  const validationSchema = Yup.object({
    cookingStepNumber: Yup.number()
      .integer()
      .required()
      .positive()
      .typeError("Must be a number"),
    cookingDirection: Yup.string().required(),
  });

  function handleFormSubmit(direction: Direction) {
    createDirection(selectedRecipe!.id, direction);
  }

  return (
    <Segment clearing>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={directionForm}
        onSubmit={(values, { resetForm }) => {
          handleFormSubmit(values);
          resetForm({});
        }}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyNumberInput
              name="cookingStepNumber"
              placeholder="Cooking Step Number"
            />

            <MyTextInput
              placeholder="Cooking Direction"
              name="cookingDirection"
            />

            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={directionFormLoading}
              floated="right"
              positive
              type="submit"
              content="Add"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
