import React from "react";
import { Dimmer } from "semantic-ui-react";

interface Props {
  inverted?: boolean;
}

export default function LoadingComponent({ inverted = true }: Props) {
  return (
    <Dimmer active={true} inverted={inverted} page>
      <img src="/assets/chibisoma.gif" alt="loader" />
    </Dimmer>
  );
}
