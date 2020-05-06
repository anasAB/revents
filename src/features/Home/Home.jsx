import React from "react";
import {
  Icon,
  Button,
  Image,
  Header,
  Container,
  Segment,
} from "semantic-ui-react";

const Home = ({ history }) => {
  return (
    <Segment inverted className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Re-vents
        </Header>
        <Button onClick={() => history.push("events")} size="huge" inverted>
          Get started
          <Icon name="right arrow" inverted />
        </Button>
      </Container>
    </Segment>
  );
};

export default Home;
