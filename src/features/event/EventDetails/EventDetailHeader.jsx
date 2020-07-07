import React, { Fragment } from "react";
import { Button, Segment, Header, Item, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

const eventImageStyle = {
  filter: "brightness(30%)",
};

const eventImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

const EventDetailHeader = ({
  event,
  isGoing,
  isHost,
  goingToEvent,
  cancelGoingToEvent,
}) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/${event.category}.jpg`}
          fluid
          style={eventImageStyle}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content="Event Title"
                  style={{ color: "white" }}
                >
                  {event.title}
                </Header>
                <p>
                  Event Date:
                  {event.date && format(parseISO(event.date), "EEE do LLL")}
                </p>
                <p>
                  Hosted by <strong>{event.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom" clearing>
        {!isHost && (
          <Fragment>
            {isGoing ? (
              <Button onClick={() => cancelGoingToEvent(event)}>
                Cancel My Place
              </Button>
            ) : (
              <Button onClick={() => goingToEvent(event)} color="teal">
                JOIN THIS EVENT
              </Button>
            )}
            {/* {JoinCancelEvent} */}
          </Fragment>
        )}
        {isHost && (
          <Button
            as={Link}
            to={`/manage/${event.id}`}
            color="orange"
            floated="right"
          >
            Manage Event
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default EventDetailHeader;
