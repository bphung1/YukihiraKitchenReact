import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";

export default function NavBar() {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Yukihira's Kitchen
        </Menu.Item>
        <Menu.Item as={NavLink} to="/recipes" name="Recipes" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createRecipe"
            positive
            content="Create Recipe"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
