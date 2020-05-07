import React, { Component } from "react";
import { connect } from "react-redux";
import { incrementCounter, decrementCounter } from "./testActions";
import { Button } from "semantic-ui-react";

class testComponent extends Component {
  render() {
    const { data, incrementCounter, decrementCounter } = this.props;

    return (
      <div>
        testArea
        <h1>{data}</h1>
        <Button
          color="teal"
          floated="left"
          content="Increment"
          positive
          onClick={incrementCounter}
        />
        <Button
          color="red"
          floated="left"
          content="Decrement"
          negative
          onClick={decrementCounter}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.test.data,
});

const mapDispatchToProps = { incrementCounter, decrementCounter };

export default connect(mapStateToProps, mapDispatchToProps)(testComponent);
