import React from "react";
import { Sticky } from "semantic-ui-react";

export default function Background() {
  return (
    <>
      <Sticky>
        <img
          src="/assets/soma.png"
          alt="Soma"
          style={{
            position: "fixed",
          }}
        />
      </Sticky>
    </>
  );
}
