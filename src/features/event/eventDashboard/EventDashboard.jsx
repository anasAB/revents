import React, { Component } from "react";
import { Grid, Container, Message, Icon } from "semantic-ui-react";
import EventList from "../eventList/EventList";
import cuid from "cuid";
import { connect } from "react-redux";
import { deleteEvent, UpdateEvent, creatEvent } from "../eventActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../EventActivity/EventActivity";
import { firestoreConnect } from "react-redux-firebase";

class EventDashboard extends Component {
  handelCreateEvent = (newEvent) => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = "assets/user.png";
    this.setState({ events: [...this.props.events, newEvent] });
  };

  //!Update Event
  handelUpdateEvent = (updatedEvent) => {
    this.props.UpdateEvent(updatedEvent);
  };

  //! Delete Event
  handelDeleteEven = (id) => {
    this.props.deleteEvent(id);
  };

  render() {
    const { events, loading } = this.props;

    if (loading) {
      return <LoadingComponent inverted={false} />;
    }

    return (
      <Container>
        <Grid>
          <Grid.Column width={10}>
            {events ? (
              <EventList events={events} removeEvent={this.handelDeleteEven} />
            ) : (
              <Message icon error>
                <Icon name="circle notched" loading />
                <Message.Content>
                  <Message.Header>Please Try Again alter..!</Message.Header>
                </Message.Content>
              </Message>
            )}
          </Grid.Column>

          <Grid.Column width={6}>
            <EventActivity />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  deleteEvent,
  UpdateEvent,
  creatEvent,
};

const mapStateToProps = (state) => {
  return {
    // events: state.events,
    //!Load events from FireStore 0
    events: state.firestore.ordered.events,
    loading: state.async.loading,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(firestoreConnect([{ collection: "events" }])(EventDashboard));
