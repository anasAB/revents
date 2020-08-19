import React, { Fragment } from "react";
import { Comment, Segment, Header } from "semantic-ui-react";
import EventChatForm from "./EventChatForm";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";

export const EventDetailChats = ({ addingComments, eventId, eventChat }) => {
  console.log("eventChat", eventChat);

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
                    <Comment.Action>Reply</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            ))}
          <EventChatForm
            addingComments={addingComments}
            eventId={eventId}
            eventChat={eventChat}
          />
        </Comment.Group>
      </Segment>
    </Fragment>
  );
};
