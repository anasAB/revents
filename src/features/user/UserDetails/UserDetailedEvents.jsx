import React from "react";
import {
  Segment,
  Header,
  Grid,
  Card,
  Image,
  Item,
  Tab,
} from "semantic-ui-react";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";

const panes = [
  { menuItem: "All events", pane: { key: "allEvents" } },
  { menuItem: "Past events", pane: { key: "pastEvents" } },
  { menuItem: "Future events", pane: { key: "futureEvents" } },
  { menuItem: "Hosting", pane: { key: "hosted" } },
];

const UserDetailedEvents = ({ events, eventLoading, changeTab }) => {
  return (
    <Grid.Column width={12}>
      <Segment attached loading={eventLoading}>
        <Header icon="calendar" content="Events" />

        <Tab
          panes={panes}
          menu={{ secondary: true, pointing: true }}
          onTabChange={(event, data) => changeTab(event, data)}
        />
        <br />

        <Card.Group itemsPerRow={5}>
          {events ? (
            events.map((event) => (
              <Card key={event.id} as={Link} to={`/event/${event.id}`}>
                <Image src={`/assets/categoryImages/${event.category}.jpg`} />
                <Card.Content>
                  <Card.Header textAlign="center">{event.title}</Card.Header>
                  <Card.Meta textAlign="center">{event.date}</Card.Meta>
                </Card.Content>
              </Card>
            ))
          ) : (
            <LazyLoad
              height={150}
              placeholder={
                <Item.Image avatar size="small" src="/assets/user.png" />
              }
            ></LazyLoad>
          )}
        </Card.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedEvents;
