import React, { Component } from "react";
import { Grid, Container, Button } from "semantic-ui-react";
import EventList from "../eventList/EventList";
import EventForm from "../EeventForm/EventForm";
import cuid from "cuid";
import { connect } from "react-redux";
import { deleteEvent, UpdateEvent, creatEvent } from "../eventActions";

class EventDashboard extends Component {
  state = {
    isOpen: false,
    selectedEvent: null,
  };

  handelTogeleOpenForm = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  handelCreateEvent = (newEvent) => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = "assets/user.png";
    this.setState({ events: [...this.props.events, newEvent] });
    // this.props.creatEvent(newEvent); //! its not working yet
  };

  handelSelectedEvent = (event) => {
    this.setState({ selectedEvent: event, isOpen: true });
  };

  //!Update Event
  handelUpdateEvent = (updatedEvent) => {
    this.props.UpdateEvent(updatedEvent);
    this.setState({ isOpen: false, selectedEvent: null });
  };

  //! Delete Event
  handelDeleteEven = (id) => {
    this.props.deleteEvent(id);
  };

  render() {
    const { isOpen } = this.state;
    const { events } = this.props;
    return (
      <Container>
        <Grid>
          <Grid.Column width={10}>
            <EventList
              events={events}
              removeEvent={this.handelDeleteEven}
              handelSelectedEvent={this.handelSelectedEvent}
            />
          </Grid.Column>

          <Grid.Column width={6}>
            <Button
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
                cancelFromOpen={this.handelTogeleOpenForm}
              />
            )}
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
  console.log("state", state);

  return {
    events: state.events,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDashboard);
