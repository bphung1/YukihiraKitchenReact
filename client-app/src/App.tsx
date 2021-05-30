import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Header, List } from "semantic-ui-react";

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:44351/api/Recipes").then((response) => {
      console.log(response);
      setRecipes(response.data);
    });
  }, []);

  return (
    <div>
      <Header as="h2" icon="food" content="Yukihira's Kitchen" />
      <List>
        {recipes.map((recipe: any) => (
          <List.Item key={recipe.id}>{recipe.recipeName}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
