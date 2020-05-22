import React, { Component, Fragment } from "react";
import EventDashboard from "../../features/event/eventDashboard/EventDashboard";
import NavBar from "../../features/Nav/NavBar/NavBar";
import { Container } from "semantic-ui-react";
import { Route, Switch, withRouter } from "react-router-dom";
import Home from "../../features/Home/Home";
import eventDetail from "../../features/event/EventDetails/eventDetail";
import PeopleDashborad from "../../features/user/PeopleDashboard/peopleDashborad";
import UserDetailsPage from "../../features/user/UserDetails/UserDetailsPage";
import EventForm from "../../features/event/EeventForm/EventForm";
import SettingDashboard from "../../features/user/setting/SettingDashboard";
import testComponent from "../../features/testarea/testComponent";
import ModelManger from "../../features/model/modelManger";

class App extends Component {
  render() {
    return (
      <Fragment>
        <ModelManger />
        <Route path="/" exact component={Home} />
        <Route
          path="/(.+)"
          render={() => (
            <Fragment>
              <NavBar />
              <Container className="main">
                <Switch key={this.props.location.key}>
                  <Route path="/events" component={EventDashboard} />
                  <Route path="/event/:id" component={eventDetail} />
                  <Route path="/people" component={PeopleDashborad} />
                  <Route path="/profile/:id" component={UserDetailsPage} />
                  <Route path="/setting" component={SettingDashboard} />
                  <Route
                    path={["/createEvent", "/manage/:id"]}
                    component={EventForm}
                  />
                  <Route path="/test" component={testComponent} />
                </Switch>
              </Container>
            </Fragment>
          )}
        ></Route>
      </Fragment>
    );
  }
}

export default withRouter(App);
