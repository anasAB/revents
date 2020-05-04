import React, { Component } from "react";
import { Grid, Container, Button } from "semantic-ui-react";
import EventList from "../eventList/EventList";
import EventForm from "../EeventForm/EventForm";

class EventDashboard extends Component {
  render() {
    return (
      <Container>
        <Grid>
          <Grid.Column width={10}>
            <EventList />
          </Grid.Column>

          <Grid.Column width={6}>
            <Button positive content="create Event" />
            <EventForm />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default EventDashboard;
