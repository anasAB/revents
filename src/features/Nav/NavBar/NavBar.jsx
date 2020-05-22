import React, { Component } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import { SignOut } from "../Menus/SignOut";
import { SignIn } from "../Menus/SignIn";
import { openModel } from "../../model/modelActions";
import { connect } from "react-redux";

class NavBar extends Component {
  state = {
    authenticated: false,
  };

  handelSignIn = () => {
    // this.setState({ authenticated: true });
    this.props.openModel("LoginModal");
  };

  handelRegister = () => {
    this.props.openModel("RegisterModal");
  };

  handelSignOut = () => {
    this.setState({ authenticated: false });
    this.props.history.push("");
  };

  render() {
    const { authenticated } = this.state;
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={NavLink} exact to="/" header>
            <img src="assets/logo.png" alt="logo" />
            Re-vents
          </Menu.Item>
          <Menu.Item as={NavLink} to="/events" name="Events" />
          <Menu.Item as={NavLink} to="/people" name="people" />
          <Menu.Item as={NavLink} to="/test" name="test" />

          <Menu.Item>
            <Button
              as={Link}
              to="createEvent"
              floated="right"
              positive
              inverted
              content="Create Event"
            />
          </Menu.Item>
          {authenticated ? (
            <SignIn signOut={this.handelSignOut} />
          ) : (
            <SignOut
              signIn={this.handelSignIn}
              register={this.handelRegister}
            />
          )}
        </Container>
      </Menu>
    );
  }
}

const mapDispatchToProps = {
  openModel,
};

export default withRouter(connect(null, mapDispatchToProps)(NavBar));
