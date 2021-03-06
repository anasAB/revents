import React from "react";
import { Dropdown, Image, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

export const SignIn = ({ signOut, currentUser }) => {
  return (
    <Menu.Item position="right">
      <Image
        avatar
        spaced="right"
        src={currentUser.photoURL || "/assets/user.png"}
      />
      <Dropdown pointing="top left" text={currentUser.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item text="Create Event" icon="plus" />
          <Dropdown.Item text="My Events" icon="calendar" />
          <Dropdown.Item text="My Network" icon="users" />
          <Dropdown.Item text="My Profile" icon="user" />
          <Dropdown.Item
            as={Link}
            to="setting"
            text="Settings"
            icon="settings"
          />
          <Dropdown.Item text="Sign Out" icon="power" onClick={signOut} />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};
