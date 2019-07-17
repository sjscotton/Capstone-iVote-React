import React, { Component } from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './Reps.css'
import { responsiveFontSizes } from '@material-ui/core/styles';
import { nullLiteral } from '@babel/types';

class Reps extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     formattedRepData: null,
  //   }
  // }
  // componentDidMount() {
  //   const officials = this.props.repsData.officials
  //   this.setState({ reps: officials })
  //   console.log("mount")
  //   console.log(officials)
  // }
  generateReps(region) {
    console.log("inside generateReps", this.props.formattedRepData)
    const officials = (this.props.formattedRepData) ? this.props.formattedRepData[region] : [];
    return officials.map((rep, i) => {
      return (
        <ExpansionPanel key={i}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            {rep.name}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>

            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.

        </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    })
  }

  // formatRepsData() {
  //   if (!this.props.repsData.officials || this.state.formattedRepData) {
  //     console.log("inside formattedRepsData conditional")
  //     console.log(this.state.formattedRepData)
  //     return;
  //   }
  //   // const regions = ['country', 'state', 'county', 'place']
  //   const formattedData = { country: [], state: [], county: [], place: [] };
  //   const officials = this.props.repsData.officials;
  //   const offices = this.props.repsData.offices;
  //   console.log("offices", offices)
  //   for (const office of offices) {
  //     const divisionIDs = office.divisionId.split('/')
  //     let region = (divisionIDs[divisionIDs.length - 1].split(':')[0])
  //     // if (!regions.includes(region)) {
  //     if (!formattedData[region]) {
  //       region = (divisionIDs[divisionIDs.length - 2].split(':')[0])
  //     }
  //     console.log(region)
  //     for (const officeIndex of office.officialIndices) {
  //       officials[officeIndex].name = office.name
  //       formattedData[region].push(officials[officeIndex])
  //     }
  //   }
  //   console.log(formattedData)
  //   this.setState({ formattedRepsData: formattedData })

  // }
  render() {
    // const data = (this.state.formattedRepData) ? this.formatRepsData()
    // const reps = this.generateReps();
    // this.formatRepsData()
    return (
      <div>
        <h2>My Representatives</h2>
        <p>{this.props.address}</p>

        <div className="panel-container">
          <div>{this.generateReps('country')}</div>
          <div>{this.generateReps('state')}</div>
          <div>{this.generateReps('county')}</div>
          <div>{this.generateReps('place')}</div>
        </div>

      </div>
    )
  }
}

export default Reps;