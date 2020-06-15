import React, { Component } from "react";
import { Segment, Form, Header, Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { DateInput } from "../../../app/common/Forms/DateInput";
import { TextInput } from "../../../app/common/Forms/TextInput";
import RadioInput from "../../../app/common/Forms/RadioInput";

class BasicPage extends Component {
  render() {
    const { pristine, submitting, handleSubmit, updateProfile } = this.props;
    return (
      <Segment>
        <Header dividing size="large" content="Basics" />
        <Form onSubmit={handleSubmit(updateProfile)}>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />

          <Form.Group inline>
            <label>Gender: </label>
            <Field
              name="gender"
              type="radio"
              value="male"
              label="Male"
              component={RadioInput}
            />
            <Field
              name="gender"
              type="radio"
              value="female"
              label="Female"
              component={RadioInput}
            />
          </Form.Group>

          <Field
            name="city"
            type="text"
            pointing="left"
            component={TextInput}
            placeholder="Home Town"
          />

          <Field
            name="date"
            component={DateInput}
            dateFormat="dd LLL yyyy h:mm a"
            showTimeSelect
            placeholder="Date and Time of Event."
          />

          <Button
            disabled={pristine || submitting}
            size="large"
            positive
            content="
            Update Profile"
          />
        </Form>
      </Segment>
    );
  }
}

export default reduxForm({
  form: "userProfile",
  enableReinitialize: true,
  destroyOnUnmount: false,
})(BasicPage);
