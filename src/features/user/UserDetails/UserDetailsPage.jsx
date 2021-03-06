import React, { Component } from "react";
import { firestoreConnect, isEmpty } from "react-redux-firebase";
import { connect } from "react-redux";
import UserDetailedHeader from "./UserDetailedHeader";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Grid } from "semantic-ui-react";
import { userDetailedQuery } from "../userDetailedQuery";
import UserDetailedSidebar from "./UserDetailedSidebar";
import UserDetailedPhotos from "./UserDetailedPhotos";
import UserDetailedDescription from "./UserDetailedDescription";
import UserDetailedEvents from "./UserDetailedEvents";
import { getUserEvents } from "../userAcions";

class UserDetailsPage extends Component {
  async componentDidMount() {
    let events = await this.props.getUserEvents(this.props.userUid);
  }

  changeTab = (event, data) => {
    this.props.getUserEvents(this.props.userUid, data.activeIndex);
  };

  render() {
    const {
      profile,
      photos,
      auth,
      match,
      requesting,
      events,
      eventsLoading,
    } = this.props;

    const isCurrentUser = auth.uid === match.params.id;
    const loading = Object.values(requesting).some((a) => a === true);
    if (loading) return <LoadingComponent />;
    return (
      <Grid>
        <UserDetailedHeader profile={profile} />
        <UserDetailedDescription profile={profile} />
        <UserDetailedSidebar isCurrentUser={isCurrentUser} />
        {photos && <UserDetailedPhotos photos={photos} />}
        <UserDetailedEvents
          events={events}
          eventLoading={eventsLoading}
          changeTab={this.changeTab}
        />
      </Grid>
    );
  }
}
const mapAction = {
  getUserEvents,
};

const mapState = (state, ownProps) => {
  let userUid = null;
  let profile = {};

  if (ownProps.match.params.id === state.auth.uid) {
    profile = state.firebase.profile;
  } else {
    profile =
      !isEmpty(state.firestore.ordered.profile) &&
      state.firestore.ordered.profile[0];
    userUid = ownProps.match.params.id;
  }

  return {
    profile,
    userUid,
    events: state.events,
    eventsLoading: state.async.loading,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos,
    requesting: state.firestore.status.requesting,
  };
};

export default connect(
  mapState,
  mapAction
)(
  firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid))(
    UserDetailsPage
  )
);
