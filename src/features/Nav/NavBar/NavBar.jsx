import React, { Component, Fragment } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import { SignOut } from "../Menus/SignOut";
import { SignIn } from "../Menus/SignIn";
import { openModel } from "../../model/modelActions";
import { connect } from "react-redux";
import { logout } from "../../auth/authActions";

class NavBar extends Component {
  handelSignIn = () => {
    this.props.openModel("LoginModal");
  };

  handelRegister = () => {
    this.props.openModel("RegisterModal");
  };

  handelSignOut = () => {
    this.props.logout();
    this.props.history.push("");
  };

  render() {
    const { authenticated, currentUser } = this.props;
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={NavLink} exact to="/" header>
            <img src="assets/logo.png" alt="logo" />
            Re-vents
          </Menu.Item>
          {authenticated && (
            <Fragment>
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
            </Fragment>
          )}

          {authenticated ? (
            <SignIn signOut={this.handelSignOut} currentUser={currentUser} />
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

const mapSateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    currentUser: state.auth.currentUser,
  };
};

const mapDispatchToProps = {
  openModel,
  logout,
};

export default withRouter(connect(mapSateToProps, mapDispatchToProps)(NavBar));
