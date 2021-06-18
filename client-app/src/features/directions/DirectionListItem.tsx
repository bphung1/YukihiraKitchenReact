import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { Direction } from "../../app/models/direction";
import { useStore } from "../../app/stores/store";

interface Props {
  direction: Direction;
  id: string;
}

export default observer(function DirectionListItem({ direction, id }: Props) {
  const [target, setTarget] = useState("");
  const { recipeStore } = useStore();
  const { directionLoading, deleteDirection } = recipeStore;

  function handleDeleteDirection(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteDirection(id);
  }

  return (
    <>
      <Segment clearing>
        <Item key={direction.directionId}>
          {direction.cookingStepNumber + " " + direction.cookingDirection}

          <Button
            name={direction.directionId}
            loading={directionLoading && target === direction.directionId}
            onClick={(e) => handleDeleteDirection(e, direction.directionId)}
            content="Delete"
            color="red"
            floated="right"
          />
        </Item>
      </Segment>
    </>
  );
});
