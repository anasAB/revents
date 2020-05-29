import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { incrementAsync, decrementAsync } from "./testAction";

class testComponent extends Component {
  render() {
    const {
      data,

      incrementAsync,
      decrementAsync,
      loading,
      name,
    } = this.props;
    return (
      <div>
        <h1>testArea</h1> <h3>Result: {data} </h3>
        <Button
          as="a"
          name="Increment"
          color="green"
          floated="left"
          content="Increment"
          // onClick={incrementCounter}
          onClick={(e) => incrementAsync(e.target.name)}
          loading={name === "Increment" && loading}
        />
        <Button
          as="a"
          name="Decrement"
          color="red"
          floated="left"
          content="Decrement"
          onClick={(e) => decrementAsync(e.target.name)} //! pass the name using event Click Handler
          loading={name === "Decrement" && loading}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  incrementAsync,
  decrementAsync,
};

const mapSateToProps = (state) => {
  return {
    data: state.tests.data,
    loading: state.async.loading,
    name: state.async.name,
  };
};

export default connect(mapSateToProps, mapDispatchToProps)(testComponent);
