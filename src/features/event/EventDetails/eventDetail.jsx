import React from "react";
import { Grid } from "semantic-ui-react";
import { EventDetailHeader } from "./EventDetailHeader";
import { EventDetailInfo } from "./EventDetailInfo";
import { EventDetailChats } from "./EventDetailChats";
import { EventDetailSidebar } from "./EventDetailSidebar";

const eventDetail = () => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader />
        <EventDetailInfo />
        <EventDetailChats />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default eventDetail;
