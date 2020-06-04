import React from "react";
import { Form, Segment, Button, Label } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { TextInput } from "../../../app/common/Forms/TextInput";
import { connect } from "react-redux";
import { registration } from "../authActions";
import { combineValidators, isRequired } from "revalidate";

const validate = combineValidators({
  displayName: isRequired({ message: "Name is Required!" }),
  email: isRequired({ message: "Email is Required!" }),
  password: isRequired({ message: "Password Is Required! " }),
});

const RegisterForm = ({
  handleSubmit,
  registration,
  error,
  invalid,
  submitting,
}) => {
  return (
    <div>
      <Form size="large" onSubmit={handleSubmit(registration)}>
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />

          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          <Button
            disabled={invalid || submitting}
            fluid
            size="large"
            color="teal"
          >
            Register
          </Button>
          {error && (
            <Label basic color="red">
              {error}
            </Label>
          )}
        </Segment>
      </Form>
    </div>
  );
};

const mapDispatchToProps = {
  registration,
};

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ form: "RegisterForm", validate })(RegisterForm));
