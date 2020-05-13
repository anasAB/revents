import React, { Component } from "react";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { creatEvent, UpdateEvent } from "../eventActions";
import { reduxForm, Field } from "redux-form";
import cuid from "cuid";
import { TextInput } from "../../../app/common/Forms/TextInput";
import { TextArea } from "../../../app/common/Forms/TextArea";
import { SelectInput } from "../../../app/common/Forms/SelectInput";

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" },
];

class EventForm extends Component {
  // state = { ...this.props };

  // componentDidMount() {
  //   if (this.props.selectdvent !== null) {
  //     this.setState({ ...this.props.selectdvent });
  //   }
  // }

  onhandelFormSubmit = (event) => {
    if (this.props.initialValues.id) {
      this.props.UpdateEvent(event);
      this.props.history.push(`/event/${this.props.initialValues.id}`);
    } else {
      console.log("initialValues", this.props.initialValues, "event", event);
      const newEvent = {
        ...event,
        id: cuid(),
        hostPhotoURL: "/public/assets/user.png",
        hostedBy: "BOB",
      };
      this.props.creatEvent(newEvent);
      this.props.history.push("events");
    }
  };

  handelUpdateEvent = (event) => {
    this.props.updateEvent(this.state);
  };

  render() {
    const { history } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            <Form onSubmit={this.props.handleSubmit(this.onhandelFormSubmit)}>
              <Field
                name="title"
                component={TextInput}
                placeholder="Give Your Event A Name"
              />
              <Field
                name="category"
                component={SelectInput}
                placeholder="What Is Your Event About !"
                options={category}
                // multiple={true}
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
              <Button type="button" onClick={() => history.goBack()}>
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
  let event = {};

  const eventId = ownProps.match.params.id;
  if (eventId && state.events.length > 0) {
    event = state.events.filter((event) => event.id === eventId)[0];
  }

  return { initialValues: event };
};

const mapDispatchToProps = {
  creatEvent,
  UpdateEvent,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "eventForm" })(EventForm));
