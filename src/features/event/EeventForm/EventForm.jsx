import React, { Component } from "react";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { creatEvent, UpdateEvent } from "../eventActions";
import { reduxForm, Field } from "redux-form";
import cuid from "cuid";
import { TextInput } from "../../../app/common/Forms/TextInput";
import { TextArea } from "../../../app/common/Forms/TextArea";
class EventForm extends Component {
  // state = { ...this.props };

  // componentDidMount() {
  //   if (this.props.selectdvent !== null) {
  //     this.setState({ ...this.props.selectdvent });
  //   }
  // }

  handelFormSubmit = (event) => {
    event.preventDefault();
    // if (this.state.id) {
    //   this.props.UpdateEvent(this.state);
    //   this.props.history.goBack();
    // } else {
    //   const newEvent = {
    //     ...this.state,
    //     id: cuid(),
    //     hostPhotoURL: "/public/assets/user.png",
    //   };
    //   this.props.creatEvent(newEvent);
    //   this.props.history.push("events");
    // }
  };

  handelUpdateEvent = (event) => {
    this.props.updateEvent(this.state);
  };

  // handleChange = (event) => {
  //   this.setState({ [event.target.name]: event.target.value });
  // };

  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            <Form onSubmit={this.handelFormSubmit}>
              <Field
                name="title"
                component={TextInput}
                placeholder="Give Your Event A Name"
                // value={}
              />
              <Field
                name="category"
                component={TextInput}
                placeholder="What Is Your Event About !"
              />

              <Field
                name="description"
                component={TextArea}
                rows={3}
                placeholder="Tell Us About Your Event"
              />

              <Field
                name="hostedBy"
                component={TextInput}
                placeholder="hostedBy"
              />

              <Header sub color="green" content="Event Location Details" />
              <Field
                name="city"
                component={TextInput}
                placeholder="Event City"
              />

              <Field
                name="venue"
                component={TextInput}
                placeholder="Event Venue"
              />
              <Field
                name="date"
                component={TextInput}
                placeholder="Event Date"
              />

              <Button positive type="submit">
                Submit
              </Button>
              <Button
                positive
                type="submit"
                onClick={() => this.handelUpdateEvent}
              >
                Update
              </Button>
              <Button type="button" onClick={() => this.props.history.goBack()}>
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "eventForm" })(EventForm));
