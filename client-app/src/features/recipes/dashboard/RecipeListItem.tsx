import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Recipe } from "../../../app/models/recipe";
import { useStore } from "../../../app/stores/store";
import RecipeDetails from "../details/RecipeDetails";

interface Props {
  recipe: Recipe;
}

export default observer(function RecipeListItem({ recipe }: Props) {
  const { modalStore } = useStore();

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src={"/assets/food.png"} />
            <Item.Content>
              <Item.Header as={Link} to={`/recipes/${recipe.id}`}>
                {recipe.recipeName}
              </Item.Header>
              <Item.Description>Description</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment clearing>
        <span>
          <Icon name="food" />
          {recipe.description}
        </span>
        <Button
          onClick={() => modalStore.openModal(<RecipeDetails id={recipe.id} />)}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
});
