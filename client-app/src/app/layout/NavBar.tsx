import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

export default function NavBar() {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Yukihira's Kitchen
        </Menu.Item>
        <Menu.Item name="Recipes" />
        <Menu.Item>
          <Button positive content="Create Recipe" />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
