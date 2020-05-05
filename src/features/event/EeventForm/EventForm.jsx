import React, { Component } from "react";
import { Segment, Form, Button } from "semantic-ui-react";

class EventForm extends Component {
  state = {
    title: "",
    date: "",
    city: "",
    venue: "",
    hostedBy: "",
  };

  componentDidMount() {
    if (this.props.selectdvent !== null) {
      this.setState({ ...this.props.selectdvent });
    }
    console.log("props", this.props);
  }

  handelFormSubmit = (event) => {
    event.preventDefault();
    this.props.createNewForm(this.state);
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
          <Button type="button" onClick={this.props.cancelFromOpen}>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default EventForm;
