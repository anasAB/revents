import React from "react";
import { connect } from "react-redux";
import TestModel from "./TestModel";
import RegisterModal from "./registerModal";
import LoginModal from "./loginModal";

const modalLookup = {
  TestModel,
  LoginModal,
  RegisterModal,
};

const modelManger = ({ currentModal }) => {
  let renderModel;
  if (currentModal) {
    const { modelName, modelProps } = currentModal;
    const ModalComponent = modalLookup[modelName];

    renderModel = <ModalComponent {...modelProps} />;
  }

  return <span>{renderModel}</span>;
};

const mapSateToProps = (state) => {
  return {
    currentModal: state.models,
  };
};

export default connect(mapSateToProps)(modelManger);
