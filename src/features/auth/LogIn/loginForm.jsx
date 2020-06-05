import React from "react";
import { Form, Segment, Button, Label, Divider } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { TextInput } from "../../../app/common/Forms/TextInput";
import { connect } from "react-redux";
import { logIn, socialLogInMethod } from "../authActions";
import SocialLogin from "../Social-Login/socialLogin";

const LoginForm = ({ logIn, handleSubmit, error, socialLogInMethod }) => {
  return (
    <Form size="large" onSubmit={handleSubmit(logIn)}>
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
        {error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
        <Button fluid size="large" color="teal">
          Login
        </Button>
        <Divider horizontal>OR</Divider>
        <SocialLogin socialLogInMethod={socialLogInMethod} />
      </Segment>
    </Form>
  );
};

const mapDispatchToProps = {
  logIn,
  socialLogInMethod,
};

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ form: "LoginForm" })(LoginForm));
