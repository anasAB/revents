import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import { connect } from "react-redux";

import LoginForm from "../auth/LogIn/loginForm";
import { closeModel } from "./modelActions";

class LoginModal extends Component {
  render() {
    const { closeModel } = this.props;
    return (
      <Modal size="mini" open={true} onClose={closeModel}>
        <Modal.Header>Login to Re-vents</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <LoginForm />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapSateToProps = { closeModel };
export default connect(null, mapSateToProps)(LoginModal);
