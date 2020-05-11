import React from "react";
import { Grid } from "semantic-ui-react";
import EventDetailInfo from "./EventDetailInfo";
import { EventDetailChats } from "./EventDetailChats";
import EventDetailSidebar from "./EventDetailSidebar";
import EventDetailHeader from "./EventDetailHeader";
import { connect } from "react-redux";

const eventDetail = (event) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader event={event} />
        <EventDetailInfo event={event} />
        <EventDetailChats />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailSidebar attendees={event.attendees} />
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {};
  if (eventId && state.events.length > 0) {
    event = state.events.filter((event) => event.id === eventId)[0];
  }
  return event;
};
export default connect(mapStateToProps)(eventDetail);
