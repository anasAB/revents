import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { incrementCounter, decrementCounter } from "./testAction";

class testComponent extends Component {
  render() {
    const { data, incrementCounter, decrementCounter } = this.props;
    return (
      <div>
        <h1>testArea</h1> <h3>Result: {data} </h3>
        <Button
          as="a"
          color="green"
          floated="left"
          content="Increment"
          onClick={incrementCounter}
        />
        <Button
          as="a"
          color="red"
          floated="left"
          content="Decrement"
          onClick={decrementCounter}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  incrementCounter,
  decrementCounter,
};

const mapSateToProps = (state) => ({
  data: state.tests.data,
});

export default connect(mapSateToProps, mapDispatchToProps)(testComponent);
