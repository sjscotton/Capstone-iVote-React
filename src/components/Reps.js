import React, { Component } from 'react';

class Reps extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     reps: []
  //   }
  // }
  // componentDidMount() {
  //   const officials = this.props.repsData.officials
  //   this.setState({ reps: officials })
  //   console.log("mount")
  //   console.log(officials)
  // }
  generateReps() {
    console.log("inside generateReps", this.props.repsData.officials)
    const officials = (this.props.repsData.officials) ? this.props.repsData.officials : [];
    return officials.map((rep, i) => {
      return (
        <div key={i}>{rep.name}</div>
      )
    })
  }
  render() {
    const reps = this.generateReps();
    return (
      <div>
        <h2>My Representatives</h2>
        <p>{this.props.address}</p>
        <div>{reps}</div>


      </div>
    )
  }
}

export default Reps;