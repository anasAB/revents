import React, { Component, Fragment } from "react";
import EventListItem from "./EventListItem";

class EventList extends Component {
  render() {
    return (
      <Fragment>
        {this.props.events.map((event) => (
          <EventListItem
            deleteEvent={this.props.removeEvent}
            key={event.id}
            event={event}
            handelSelectedEvent={this.props.handelSelectedEvent}
          />
        ))}
      </Fragment>
    );
  }
}

export default EventList;
