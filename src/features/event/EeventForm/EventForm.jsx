import React, { Component } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { creatEvent, UpdateEvent } from "../eventActions";
import cuid from "cuid";

class EventForm extends Component {
  state = { ...this.props };

  componentDidMount() {
    if (this.props.selectdvent !== null) {
      this.setState({ ...this.props.selectdvent });
    }
  }

  handelFormSubmit = (event) => {
    event.preventDefault();

    if (this.state.id) {
      this.props.UpdateEvent(this.state);
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...this.state,
        id: cuid(),
        hostPhotoURL: "/public/assets/user.png",
      };
      this.props.creatEvent(newEvent);
      this.props.history.push("events");
    }
  };

  handelUpdateEvent = (event) => {
    this.props.updateEvent(this.state);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <Segment>
        <Form onSubmit={this.handelFormSubmit}>
          <Form.Field>
            <label>Event Title</label>
            <input
              name="title"
              value={this.state.title}
              placeholder="Event Title"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input
              name="date"
              value={this.state.date}
              type="date"
              placeholder="Event Date"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              name="city"
              value={this.state.city}
              placeholder="City event is taking place"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              name="venue"
              value={this.state.venue}
              placeholder="Enter the Venue of the event"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              name="hostedBy"
              value={this.state.hostedBy}
              placeholder="Enter the name of person hosting"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button positive type="submit" onClick={() => this.handelUpdateEvent}>
            Update
          </Button>
          <Button type="button" onClick={() => this.props.history.goBack()}>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let event = {
    title: "",
    date: "",
    city: "",
    venue: "",
    hostedBy: "",
  };

  const eventId = ownProps.match.params.id;
  if (eventId && state.events.length > 0) {
    event = state.events.filter((event) => event.id === eventId)[0];
  }

  return event;
};

const mapDispatchToProps = {
  creatEvent,
  UpdateEvent,
};
export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
