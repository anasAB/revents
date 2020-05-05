import React, { Component } from "react";
import { Button, Segment, List, Icon, Item } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";

class EventListItem extends Component {
  render() {
    const { event, selectEvent, removeEvent } = this.props;
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
            <Icon name="clock" /> {event.date} |
            <Icon name="marker" /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees &&
              event.attendees.map((attend) => (
                <EventListAttendee key={attend.id} attend={attend} />
              ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{event.description}</span>
          <Button
            as="a"
            color="teal"
            floated="right"
            content="View"
            onClick={() => this.props.handelSelectedEvent(event)}
          />

          <Button
            as="a"
            color="red"
            floated="left"
            content="Delete"
            onClick={() => this.props.removeEvent(event.id)}
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventListItem;
