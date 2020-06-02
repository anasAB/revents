import React, { Component } from "react";
import { Button, Segment, List, Icon, Item } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

class EventListItem extends Component {
  render() {
    const { event, deleteEvent } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header as="a">{event.title}</Item.Header>
                <Item.Description>
                  Hosted by <a>{event.hostedBy}</a>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {format(event.date.toDate(), "EEE do LLL")} at{" "}
            {format(event.date.toDate(), "h:mm a")} |
            <Icon name="marker" /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees &&
              Object.values(event.attendees).map((attend) => (
                <EventListAttendee key={attend.id} attend={attend} />
              ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{event.description}</span>
          <Button
            as={Link}
            to={`/event/${event.id}`}
            color="teal"
            floated="right"
            content="View"
            // onClick={() => this.props.handelSelectedEvent(event)}
          />

          <Button
            as="a"
            color="red"
            floated="left"
            content="Delete"
            onClick={() => deleteEvent(event.id)}
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventListItem;
