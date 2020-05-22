import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import { connect } from "react-redux";

import { closeModel } from "./modelActions";
import RegisterForm from "../auth/Register/registerForm";

class RegisterModal extends Component {
  render() {
    return (
      <Modal size="mini" open={true} onClose={this.props.closeModel}>
        <Modal.Header>Sign Up to Re-vents!</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <RegisterForm />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}
const mapSateToProps = { closeModel };

export default connect(null, mapSateToProps)(RegisterModal);
