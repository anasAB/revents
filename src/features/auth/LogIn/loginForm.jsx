import React from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { TextInput } from "../../../app/common/Forms/TextInput";
import { connect } from "react-redux";
import { logIn } from "../authActions";

const LoginForm = ({ logIn, handleSubmit }) => {
  return (
    <Form error size="large" onSubmit={handleSubmit(logIn)}>
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="password"
        />
        <Button fluid size="large" color="teal">
          Login
        </Button>
      </Segment>
    </Form>
  );
};

const mapDispatchToProps = {
  logIn,
};

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ form: "LoginForm" })(LoginForm));
