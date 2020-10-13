import React, { Component, Fragment } from "react";
import { Comment, Segment, Header } from "semantic-ui-react";
import EventChatForm from "./EventChatForm";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";

class EventDetailChats extends Component {
  state = {
    showReplyForm: false,
    selectedCommentId: null,
  };

  handelOpenReplyForm = (id) => () => {
    this.setState({ showReplyForm: true, selectedCommentId: id });
  };

  handelCloseReply = () => {
    this.setState({ showReplyForm: false, selectedCommentId: null });
  };

  render() {
    const { addingComments, eventId, eventChat } = this.props;
    const { showReplyForm, selectedCommentId } = this.state;

    return (
      <Fragment>
        <Segment
          textAlign="center"
          attached="top"
          inverted
          color="teal"
          style={{ border: "none" }}
        >
          <Header>Chat about this event</Header>
        </Segment>
        <Segment attached>
          <Comment.Group>
            {eventChat &&
              Object.keys(eventChat).map((chat) => (
                <Comment key={eventChat[chat].id}>
                  <Comment.Avatar
                    src={eventChat[chat].photoURL || "/assets/user.png"}
                  />
                  <Comment.Content>
                    <Comment.Author
                      as={Link}
                      to={`/profile/${eventChat[chat].uid}`}
                    >
                      {eventChat[chat].displayName}
                    </Comment.Author>
                    <Comment.Metadata>
                      <div>
                        {formatDistance(eventChat[chat].date, Date.now())} ago
                      </div>
                    </Comment.Metadata>
                    <Comment.Text>{eventChat[chat].textComment}</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action
                        onClick={this.handelOpenReplyForm(eventChat[chat].id)}
                      >
                        Reply :{eventChat[chat].id}
                      </Comment.Action>
                      {showReplyForm &&
                        selectedCommentId === eventChat[chat].id && (
                          <EventChatForm
                            addingComments={addingComments}
                            eventId={eventId}
                            form={`reply_${chat.id}`}
                            closeForm={this.handelCloseReply}
                            parentId={eventChat[chat].id}
                          />
                        )}
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
              ))}
            <EventChatForm
              parentId={0}
              addingComments={addingComments}
              eventId={eventId}
              eventChat={eventChat}
              form={`newComment`}
            />
          </Comment.Group>
        </Segment>
      </Fragment>
    );
  }
}

export default EventDetailChats;
