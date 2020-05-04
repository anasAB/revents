import React, { Component, Fragment } from "react";
import EventListItem from "./EventListItem";

class EventList extends Component {
  //   constructor(props) {
  //     super(props);
  //   }

  render() {
    // const events = this.props.events.map(event => );

    return (
      <Fragment>
        {this.props.events.map((event) => (
          <EventListItem key={event.id} event={event} />
        ))}

        {/* <EventListItem />
        <EventListItem />
        <EventListItem /> */}
      </Fragment>
    );
  }
}

export default EventList;
