import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import EventDetailInfo from "./EventDetailInfo";
import { EventDetailChats } from "./EventDetailChats";
import EventDetailSidebar from "./EventDetailSidebar";
import EventDetailHeader from "./EventDetailHeader";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";

const objectToArray = (object) => {
  if (object) {
    //!source[1] will give us the value && { id: source[0] } is the ID

    return Object.entries(object).map((source) =>
      Object.assign({}, source[1], { id: source[0] })
    );
  }
};

class eventDetail extends Component {
  async componentDidMount() {
    const { firestore, match, history } = this.props;
    let event = await firestore.get(`events/${match.params.id}`);

    //!in Case of event is not exists
    if (!event.exists) {
      history.push("/events");
      toastr.error("Sorry", "Event not Found");
    }
  }

  render() {
    const { event } = this.props;
    const attendees =
      event && event.attendees && objectToArray(event.attendees);

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailHeader event={event} />
          <EventDetailInfo event={event} />
          <EventDetailChats />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {};

  if (
    state.firestore.ordered.events &&
    state.firestore.ordered.events.length > 0
  ) {
    event =
      state.firestore.ordered.events.filter(
        (event) => event.id === eventId
      )[0] || {};
  }
  return {
    event,
    auth: state.firebase.auth,
  };
};
export default withFirestore(connect(mapStateToProps)(eventDetail));
