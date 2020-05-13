import React from "react";
import { Label, Form } from "semantic-ui-react";

export const TextInput = ({
  input,
  type,
  width,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error}>
      <input {...input} placeholder={placeholder} type={type} />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};
