import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import EventDetailInfo from "./EventDetailInfo";
import EventDetailSidebar from "./EventDetailSidebar";
import EventDetailHeader from "./EventDetailHeader";
import { connect } from "react-redux";
import { withFirestore, firebaseConnect, isEmpty } from "react-redux-firebase";
import { goingToEvent, cancelGoingToEvent } from "../../user/userAcions";
import { compose } from "redux";
import { addingComments } from "../eventActions";
import EventDetailChats from "./EventDetailChats";

export const objectToArray = (object) => {
  if (object) {
    //!source[1] will give us the value && { id: source[0] } is the ID

    return Object.entries(object).map((source) =>
      Object.assign({}, source[1], { id: source[0] })
    );
  }
};

class eventDetail extends Component {
  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  render() {
    const {
      event,
      auth,
      goingToEvent,
      cancelGoingToEvent,
      addingComments,
      eventChat,
    } = this.props;

    const attendees =
      event && event.attendees && objectToArray(event.attendees);
    const isHost = event.hostUid === auth.uid;
    const isGoing = attendees && attendees.some((a) => a.id === auth.uid);

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailHeader
            event={event}
            isGoing={isGoing}
            isHost={isHost}
            goingToEvent={goingToEvent}
            cancelGoingToEvent={cancelGoingToEvent}
          />

          <EventDetailInfo event={event} />
          <EventDetailChats
            addingComments={addingComments}
            eventId={event.id}
            eventChat={eventChat}
          />
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

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }

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
    eventChat:
      !isEmpty(state.firebase.data.event_chat) &&
      objectToArray(state.firebase.data.event_chat[ownProps.match.params.id]),
  };
};

const mapDispatchToProps = {
  goingToEvent,
  cancelGoingToEvent,
  addingComments,
};

export default compose(
  withFirestore,
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect((props) => [`event_chat/${props.match.params.id}`])
)(eventDetail);
