import { observer } from "mobx-react-lite";
import React from "react";
import { Header, Menu } from "semantic-ui-react";

export default observer(function RecipeFilter() {
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: "15px" }}>
        <Header icon="filter" attached color="teal" content="Filter" />
        <Menu.Item content="All Recipes" />
        <Menu.Item content="All Recipes" />
        <Menu.Item content="All Recipes" />
      </Menu>
      <Header />
    </>
  );
});
