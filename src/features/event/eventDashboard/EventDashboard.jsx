import React, { Component } from "react";
import { Grid, Container, Button } from "semantic-ui-react";
import EventList from "../eventList/EventList";
import cuid from "cuid";
import { connect } from "react-redux";
import { deleteEvent, UpdateEvent, creatEvent } from "../eventActions";

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
    const { events } = this.props;
    return (
      <Container>
        <Grid>
          <Grid.Column width={10}>
            <EventList events={events} removeEvent={this.handelDeleteEven} />
          </Grid.Column>

          <Grid.Column width={6}>
            {/* <Button
              positive
              content="create Event"
              onClick={this.handelTogeleOpenForm}
            />
            {isOpen && (
              <EventForm
                key={this.state.selectedEvent ? this.state.selectedEvent.id : 0}
                selectdvent={this.state.selectedEvent}
                updateEvent={this.handelUpdateEvent}
                createNewForm={this.handelCreateEvent}
                // cancelFromOpen={this.handelTogeleOpenForm}
              />
            )} */}
            <h1>Acivity Feed</h1>
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
    events: state.events,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDashboard);
