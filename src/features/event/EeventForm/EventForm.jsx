import React, { Component } from "react";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { creatEvent, UpdateEvent, cancelToggle } from "../eventActions";
import { reduxForm, Field } from "redux-form";
import { TextInput } from "../../../app/common/Forms/TextInput";
import { TextArea } from "../../../app/common/Forms/TextArea";
import { SelectInput } from "../../../app/common/Forms/SelectInput";
import { DateInput } from "../../../app/common/Forms/DateInput";

import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan,
} from "revalidate";
import { withFirestore } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";

const validate = combineValidators({
  title: isRequired({ message: "the Event Title is required..!" }),
  category: isRequired({ message: "Category is required..!" }),
  description: composeValidators(
    isRequired({ message: "Description is required...!" }),
    hasLengthGreaterThan(4)({
      message: "Descriptions should more than few words..!",
    })
  )(),
  city: isRequired({ message: "Dont forget the City" }),
  venue: isRequired("venue"),
  date: isRequired("Date"),
});

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" },
];

class EventForm extends Component {
  async componentDidMount() {
    const { firestore, match, history } = this.props;

    let event = await firestore.get(`events/${match.params.id}`);
    //! update event
    await firestore.setListener(`events/${match.params.id}`);

    //!in Case of event is not exists
    // if (!event.exists) {
    //   history.push("/events");
    //   toastr.error("Sorry", "Event not Found");
    // }
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  onhandelFormSubmit = async (event) => {
    try {
      if (this.props.initialValues.id) {
        this.props.UpdateEvent(event);
        this.props.history.push(`/events/${this.props.initialValues.id}`);
      } else {
        let createdEvent = await this.props.creatEvent(event);
        this.props.history.push(`events/${createdEvent.id}`);
      }
    } catch (error) {
      toastr.error("Sorry", error.message);
    }
  };

  handelUpdateEvent = (event) => {
    this.props.updateEvent(this.state);
  };

  render() {
    const { history, invalid, pristine, event, cancelToggle } = this.props;
    console.log("event Form", event);

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
                component={DateInput}
                dateFormat="dd LLL yyyy h:mm a"
                showTimeSelect
                placeholder="Date and Time of Event."
              />

              <Button positive type="submit" disabled={invalid || pristine}>
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
              <Button
                content={event.cancelled ? "Reactivate Event" : "Cancel Event"}
                type="button"
                color={!event.cancelled ? "red" : "green"}
                onClick={() => cancelToggle(!event.cancelled, event.id)}
                floated="right"
              />
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {};

  //!get event from firestore
  if (
    state.firestore.ordered.events &&
    state.firestore.ordered.events.length > 0
  ) {
    event =
      state.firestore.ordered.events.filter(
        (event) => event.id === eventId
      )[0] || {};
  }
  return { initialValues: event, event };
};

const mapDispatchToProps = {
  creatEvent,
  UpdateEvent,
  cancelToggle,
};

export default withFirestore(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    reduxForm({ form: "eventForm", validate, enableReinitialize: true })(
      EventForm
    )
  )
);
