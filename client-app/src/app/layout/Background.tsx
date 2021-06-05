import React from "react";
import { Image, Sticky } from "semantic-ui-react";

export default function Background() {
  return (
    <>
      <Sticky>
        <Image className="ui sticky">
          <img
            src="/assets/soma.png"
            alt="Soma"
            style={{
              position: "absolute",
              marginTop: "100px",
            }}
          />
        </Image>
      </Sticky>
    </>
  );
}
