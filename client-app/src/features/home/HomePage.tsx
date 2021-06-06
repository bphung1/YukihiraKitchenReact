import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

export default function HomePage() {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Yukihira's Kitchen
        </Header>
        <Header as="h2" inverted content="Welcome to Yukihira's Kitchen" />
        <Button as={Link} to="/recipes" size="huge" inverted>
          Take me to Yukihira's Kitchen
        </Button>
      </Container>
    </Segment>
  );
}
