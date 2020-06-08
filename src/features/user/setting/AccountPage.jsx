import React from "react";
import {
  Segment,
  Header,
  Form,
  Divider,
  Label,
  Button,
  Icon,
} from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { TextInput } from "../../../app/common/Forms/TextInput";
import {
  combineValidators,
  matchesField,
  isRequired,
  composeValidators,
  hasLengthGreaterThan,
} from "revalidate";

const validate = combineValidators({
  newPassword1: composeValidators(
    isRequired({ message: "newPassword is required" }),
    hasLengthGreaterThan(4)({
      message: "Password Should be more than 4..!",
    })
  )(),
  newPassword2: composeValidators(
    isRequired({ message: "newPassword is required" }),
    matchesField("newPassword1")({ message: "Passwords should be the same " })
  )(),
});

const AccountPage = ({
  error,
  invalid,
  submitting,
  handleSubmit,
  updatePassword,
  providerId,
}) => {
  return (
    <Segment>
      <Header dividing size="large" color="teal" content="Change password" />
      {providerId && providerId === "password" && (
        <div>
          <Form onSubmit={handleSubmit(updatePassword)}>
            <Field
              width={8}
              name="newPassword1"
              type="password"
              pointing="left"
              inline={true}
              component={TextInput}
              basic={true}
              placeholder="New Password"
            />
            <Field
              width={8}
              name="newPassword2"
              type="password"
              inline={true}
              basic={true}
              pointing="left"
              component={TextInput}
              placeholder="Confirm Password"
            />
            {error && (
              <Label basic color="red">
                {error}
              </Label>
            )}
            <Divider />
            <Button
              size="large"
              positive
              content="Update Password"
              disabled={invalid || submitting}
            />
          </Form>
        </div>
      )}

      <div style={{ marginTop: "10px" }}>
        {providerId && providerId === "facebook.com" && (
          <div>
            <Header color="teal" sub content="Facebook Account" />
            <p>Please visit Facebook to update your account settings</p>
            <Button type="button" color="facebook">
              <Icon name="facebook" />
              Go to Facebook
            </Button>
          </div>
        )}
        {providerId && providerId === "facebook.com" && (
          <div>
            <Header color="teal" sub content="Google Account" />
            <p>Please visit Google to update your account settings</p>
            <Button type="button" color="google plus">
              <Icon name="google plus" />
              Go to Google
            </Button>
          </div>
        )}
      </div>
    </Segment>
  );
};

export default reduxForm({ form: "account", validate })(AccountPage);
