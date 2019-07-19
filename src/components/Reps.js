import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './Reps.css'
// import { responsiveFontSizes } from '@material-ui/core/styles';
// import { nullLiteral } from '@babel/types';

class Reps extends Component {


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
            <div>
              {rep.title}
              <img src={rep.photoUrl} alt="official" />
            </div>

          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    })
  }

  render() {

    // uncomment this to redirect if user not logged in
    if (!this.props.loggedIn) {
      this.props.history.push('/Login')
    }
    return (
      <div>
        <h2>My Representatives</h2>
        <p>{this.props.address}</p>

        <div className="panel-container">
          <h3>City</h3>
          <div>{this.generateReps('place')}</div>
          <h3>County</h3>
          <div>{this.generateReps('county')}</div>
          <h3>State</h3>
          <div>{this.generateReps('state')}</div>
          <h3>Federal</h3>
          <div>{this.generateReps('country')}</div>



        </div>

      </div>
    )
  }
}

export default withRouter(Reps);