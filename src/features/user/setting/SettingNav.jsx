import React, { Component } from "react";
import { Menu, Header, Grid } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

class SettingNav extends Component {
  render() {
    return (
      <Grid.Column width={4}>
        <Menu vertical>
          <Header
            icon="user"
            attached
            inverted
            color="grey"
            content="Profile"
          />
          <Menu.Item as={NavLink} to="/setting/basic">
            Basics
          </Menu.Item>
          <Menu.Item as={NavLink} to="/setting/about">
            About Me
          </Menu.Item>
          <Menu.Item as={NavLink} to="/setting/photos">
            My Photos
          </Menu.Item>
        </Menu>
        <Grid.Row />
        <Menu vertical>
          <Header
            icon="settings"
            attached
            inverted
            color="grey"
            content="Account"
          />
          <Menu.Item as={NavLink} to="/setting/account">
            My Account
          </Menu.Item>
        </Menu>
      </Grid.Column>
    );
  }
}

export default SettingNav;
