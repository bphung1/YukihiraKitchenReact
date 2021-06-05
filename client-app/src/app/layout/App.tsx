import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import RecipeDashboard from "../../features/recipes/dashboard/RecipeDashboard";
import { observer } from "mobx-react-lite";
import { Route, useLocation } from "react-router";
import HomePage from "../../features/home/HomePage";
import RecipeForm from "../../features/recipes/forms/RecipeForm";
import RecipeDetails from "../../features/recipes/details/RecipeDetails";

function App() {
  const location = useLocation();

  return (
    <>
      <Route exact path="/" component={HomePage} />
      {/* /(.+) means that any route that match the forward '/' plus(+) something else*/}
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/recipes" component={RecipeDashboard} />
              <Route path="/recipes/:id" component={RecipeDetails} />
              <Route
                key={location.key}
                path={["/createRecipe", "/manage/:id"]}
                component={RecipeForm}
              />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
