import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../app/stores/store";
import DirectionListItem from "./DirectionListItem";

export default observer(function DirectionList() {
  const { recipeStore } = useStore();
  const { selectedRecipe } = recipeStore;
  return (
    <>
      {selectedRecipe!.directions?.map((direction) => (
        <DirectionListItem
          key={direction.directionId}
          direction={direction}
          id={selectedRecipe!.id}
        />
      ))}
    </>
  );
});
