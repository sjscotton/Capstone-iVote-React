import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './Reps.css'


const nonElectedPositions = ["Elections Director", "Assessor", "WA Supreme Court Justice", "State Auditor", "Commissioner of Public Lands", "Secretary of State", "State Treasurer", "Insurance Commissioner", "State Superintendent of Public Instruction"]

class Reps extends Component {

  componentDidMount() {
    this.props.setCurrPageCallback('reps')
  }

  generateContactInfo(channels) {
    return channels.map((channel, i) => {
      return (
        <li key={i}>{`${channel.type}: ${channel.id}`}</li>
      )
    })
  }
  generateReps(region) {
    console.log("inside generateReps", this.props.formattedRepData)
    const officials = (this.props.formattedRepData) ? this.props.formattedRepData[region] : [];

    return officials.map((rep, i) => {
      const email = (rep.emails) ? `Email: ${rep.emails[0]}` : '';
      const socialMedia = (rep.channels) ? this.generateContactInfo(rep.channels) : [];
      if (nonElectedPositions.includes(rep.title)) {
        return (<div key={i}></div>)
      } else {
        return (
          <ExpansionPanel key={i}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div className="bold">{rep.title}</div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className="rep-info">

                <p className="bold name">{rep.name}</p>


                <div className="rep-flex">
                  <ul className="contact-info phone">
                    <li className="bold">Contact info:</li>
                    <li>Phone: {rep.phones[0]}</li>
                    <li>{email}</li>
                  </ul>
                  <ul className="contact-info ">
                    <li className="bold">Social Media:</li>
                    {socialMedia}
                  </ul>

                </div>

                {/* <img src={rep.photoUrl} alt="official" /> */}
              </div>

            </ExpansionPanelDetails>
          </ExpansionPanel>
        )
      }
    })
  }

  render() {

    // uncomment this to redirect if user not logged in
    if (!this.props.loggedIn) {
      this.props.history.push('/Login')
    }
    return (
      <div>
        <h1>My Representatives</h1>
        {/* <p>{this.props.address}</p> */}

        <div className="panel-container">
          <h3>City</h3>
          <div>{this.generateReps('place')}</div>
          <h3>County</h3>
          <div>{this.generateReps('county')}</div>
          <h3>Washington State</h3>
          <div>{this.generateReps('state')}</div>
          <h3>United States</h3>
          <div>{this.generateReps('country')}</div>



        </div>

      </div>
    )
  }
}

export default withRouter(Reps);