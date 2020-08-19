import React from "react";
import { Grid } from "semantic-ui-react";
import SettingNav from "../setting/SettingNav";
import { Route, Switch, Redirect } from "react-router-dom";
import BasicPage from "./BasicPage";
import AboutPage from "./AboutPage";
import PhotosPage from "../setting/Photos/PhotosPage";
import AccountPage from "./AccountPage";
import { connect } from "react-redux";
import { updatePassword } from "../../auth/authActions";
import { updateProfile } from "../userAcions";

const SettingDashboard = ({
  updatePassword,
  providerId,
  updateProfile,
  user,
}) => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from="/setting" to="/setting/basic"></Redirect>
          <Route
            path="/setting/basic"
            render={() => (
              <BasicPage initialValues={user} updateProfile={updateProfile} />
            )}
          />
          <Route
            path="/setting/about"
            render={() => (
              <AboutPage initialValues={user} updateProfile={updateProfile} />
            )}
          />

          <Route path="/setting/photos" component={PhotosPage} />
          <Route
            path="/setting/account"
            render={() => (
              <AccountPage
                updatePassword={updatePassword}
                providerId={providerId}
              />
            )}
          />
        </Switch>
      </Grid.Column>

      <Grid.Column width={4}>
        <SettingNav />
      </Grid.Column>
    </Grid>
  );
};

const mapDispatchToProps = {
  updatePassword,
  updateProfile,
};

const mapStateToProps = (state) => {
  return {
    providerId:
      state.firebase.auth.isLoaded &&
      state.firebase.auth.providerData[0].providerId,
    user: state.firebase.profile,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingDashboard);
