import React, { Component } from 'react';

class Reps extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = {
  //   //   reps: this.props.reps
  //   // }
  // }
  render() {
    return (
      <div>
        <h2>My Representatives</h2>
        <p>{this.props.address}</p>
      </div>
    )
  }
}

export default Reps;