import { observer } from "mobx-react-lite";
import React from "react";
import DirectionForm from "./DirectionForm";
import DirectionList from "./DirectionList";

export default observer(function DirectionDashboard() {
  return (
    <>
      <DirectionList />
      <DirectionForm />
    </>
  );
});
