import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { TextArea } from "../../../app/common/Forms/TextArea";

class EventChatForm extends Component {
  handelCommentSubmit = (comment) => {
    const { addingComments, eventId, reset, closeForm, parentId } = this.props;
    addingComments(eventId, comment, parentId);
    reset();
    if (parentId !== 0) {
      closeForm();
    }

    console.log("eventid", this.props.eventId, "parentId", parentId);
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.handelCommentSubmit)}>
        <Field name="comment" type="text" component={TextArea} rows={2} />
        <Button content="Add Reply" labelPosition="left" icon="edit" primary />
      </Form>
    );
  }
}

export default reduxForm({ Field: "comment" })(EventChatForm);
