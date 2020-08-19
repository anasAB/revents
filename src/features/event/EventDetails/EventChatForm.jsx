import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { TextArea } from "../../../app/common/Forms/TextArea";

class EventChatForm extends Component {
  handelCommentSubmit = (comment) => {
    const { addingComments, eventId, reset } = this.props;
    addingComments(eventId, comment);
    reset();
  };

  render() {
    const { eventChat } = this.props;

    return (
      <Form onSubmit={this.props.handleSubmit(this.handelCommentSubmit)}>
        <Field name="comment" type="text" component={TextArea} rows={2} />
        <Button content="Add Reply" labelPosition="left" icon="edit" primary />
      </Form>
    );
  }
}

export default reduxForm({ form: "eventChat" })(EventChatForm);
