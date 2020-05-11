import React from "react";
import { Grid } from "semantic-ui-react";
import EventDetailInfo from "./EventDetailInfo";
import { EventDetailChats } from "./EventDetailChats";
import EventDetailSidebar from "./EventDetailSidebar";
import EventDetailHeader from "./EventDetailHeader";

const event = {
  id: "1",
  title: "Trip to Tower of London",
  date: "2018-03-27",
  category: "culture",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
  city: "London, UK",
  venue: "Tower of London, St Katharine's & Wapping, London",
  hostedBy: "Bob",
  hostPhotoURL: "https://randomuser.me/api/portraits/men/20.jpg",
  attendees: [
    {
      id: "a",
      name: "Bob",
      photoURL: "https://randomuser.me/api/portraits/men/20.jpg",
    },
    {
      id: "b",
      name: "Tom",
      photoURL: "https://randomuser.me/api/portraits/men/22.jpg",
    },
  ],
};

const eventDetail = () => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader event={event} />
        <EventDetailInfo event={event} />
        <EventDetailChats />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailSidebar attendees={event.attendees} />
      </Grid.Column>
    </Grid>
  );
};

export default eventDetail;
