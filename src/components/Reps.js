import React, { Component } from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './Reps.css'

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
        <div className="panel-container">
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography >Expansion Panel 1</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
          </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>

      </div>
    )
  }
}

export default Reps;