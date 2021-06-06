import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header, Item, Segment, Image } from "semantic-ui-react";
import { Recipe } from "../../../app/models/recipe";

const activityImageStyle = {
  filter: "brightness(30%)",
};

const recipeImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  recipe: Recipe;
}

export default observer(function RecipeDetailHeader({ recipe }: Props) {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image src={`/assets/food.png`} fluid style={activityImageStyle} />
        <Segment style={recipeImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={recipe.recipeName}
                  style={{ color: "white" }}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Button>Delete recipe</Button>
        <Button color="orange" floated="right">
          Manage recipe
        </Button>
      </Segment>
    </Segment.Group>
  );
});
