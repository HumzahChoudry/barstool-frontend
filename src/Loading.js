import React from "react";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

const Loading = () => {
  return (
    <Segment>
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>

      <Image src="https://cdn-images-1.medium.com/max/2600/1*71bjC7zmgID3ANFcLoQt8g.png" />
    </Segment>
  );
};

export default Loading;
