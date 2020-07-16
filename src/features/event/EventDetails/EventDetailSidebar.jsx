import React, { Fragment } from "react";
import { Item, Label, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

const EventDetailSidebar = ({ attendees }) => {
  return (
    <Fragment>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {attendees && attendees.length}
        {attendees && attendees.length === 1 ? "Person" : "People"} Going
      </Segment>
      <Segment attached>
        <Item.Group divided>
          {attendees &&
            attendees.map((attendee) => (
              <Item key={attendee.id} style={{ position: "relative" }}>
                {attendees.host && (
                  <Label
                    style={{ position: "absolute" }}
                    color="green"
                    ribbon="right"
                  >
                    Host
                  </Label>
                )}
                <Item.Image size="tiny" src={attendee.photoURL} />
                <Item.Content verticalAlign="middle">
                  <Item.Header as="h3">
                    <Link to={`/profile/${attendee.id}`}>
                      {attendee.displayName}
                    </Link>
                  </Item.Header>
                </Item.Content>
              </Item>
            ))}
        </Item.Group>
      </Segment>
    </Fragment>
  );
};

export default EventDetailSidebar;
