import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import SettingNav from "../setting/SettingNav";
import { Route, Switch, Redirect } from "react-router-dom";
import BasicPage from "./BasicPage";
import AboutPage from "./AboutPage";
import PhotosPage from "./PhotosPage";
import AccountPage from "./AccountPage";

class SettingDashboard extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column width={12}>
          <Switch>
            <Redirect exact from="/setting" to="/setting/basic"></Redirect>
            <Route path="/setting/basic" component={BasicPage} />
            <Route path="/setting/about" component={AboutPage} />
            <Route path="/setting/photos" component={PhotosPage} />
            <Route path="/setting/account" component={AccountPage} />
          </Switch>
        </Grid.Column>

        <Grid.Column width={4}>
          <SettingNav />
        </Grid.Column>
      </Grid>
    );
  }
}

export default SettingDashboard;
