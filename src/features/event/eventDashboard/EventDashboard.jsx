import React, { Component } from "react";
import { Grid, Container, Button } from "semantic-ui-react";
import EventList from "../eventList/EventList";
import EventForm from "../EeventForm/EventForm";
import cuid from "cuid";

const events = [
  {
    id: "1",
    title: "Trip to Tower of London",
    date: "2018-03-27",
    category: "culture",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: "Bob",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/20.jpg",
    attendees: [
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg",
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg",
      },
    ],
  },
  {
    id: "2",
    title: "Trip to Punch and Judy Pub",
    date: "2018-03-28",
    category: "drinks",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Punch & Judy, Henrietta Street, London, UK",
    hostedBy: "Tom",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/22.jpg",
    attendees: [
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg",
      },
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg",
      },
    ],
  },
];

class EventDashboard extends Component {
  state = {
    events: events,
    isOpen: false,
    selectedEvent: null,
  };

  handelTogeleOpenForm = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  handelCreateEven = (newEvent) => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = "assets/user.png";
    this.setState({ events: [...this.state.events, newEvent] });
  };

  handelSelectedEvent = (event) => {
    this.setState({ selectedEvent: event, isOpen: true });
  };

  //!Update Event
  handelUpdateEvent = (updatedEvent) => {
    this.setState(({ events }) => ({
      events: events.map((event) => {
        if (event.id === updatedEvent.id) {
          return { ...updatedEvent }; //! its will spread the new updated event in our State
        } else {
          return event;
        }
      }),
      selectedEvent: null,
      isOpen: false,
    }));
  };

  render() {
    const { events, isOpen } = this.state;
    return (
      <Container>
        <Grid>
          <Grid.Column width={10}>
            <EventList
              events={events}
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
                createNewForm={this.handelCreateEven}
                cancelFromOpen={this.handelTogeleOpenForm}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default EventDashboard;
