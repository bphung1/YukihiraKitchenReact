import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header, Item, Segment, Image } from "semantic-ui-react";
import PhotoUploadWidget from "../../../app/common/imageUpload/PhotoUploadWidget";
import { Recipe } from "../../../app/models/recipe";
import { useStore } from "../../../app/stores/store";
import RecipeForm from "../forms/RecipeForm";

const recipeImageStyle = {
  filter: "brightness(30%)",
  height: "400px",
  marginLeft: "auto",
  marginRight: "auto",
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
  const { modalStore, userStore, recipeStore } = useStore();

  function handleDeleteRecipe(id: string) {
    recipeStore.deleteRecipe(id).then(() => {
      modalStore.closeModal();
    });
  }

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={recipe.photo || `/assets/food.png`}
          fluid
          style={recipeImageStyle}
        />
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
      {userStore.isLoggedIn ? (
        <>
          <Segment clearing attached="bottom">
            <Button
              loading={recipeStore.loading}
              onClick={() => handleDeleteRecipe(recipe.id)}
            >
              Delete recipe
            </Button>
            <Button
              onClick={() =>
                modalStore.openModal(<RecipeForm id={recipe.id} />)
              }
              color="orange"
              floated="right"
            >
              Manage recipe
            </Button>
            <Button
              onClick={() => modalStore.openModal(<PhotoUploadWidget />)}
              color="orange"
              floated="right"
              content={recipe.photo ? "Change Photo" : "Upload"}
            ></Button>
          </Segment>
        </>
      ) : (
        ""
      )}
    </Segment.Group>
  );
});
