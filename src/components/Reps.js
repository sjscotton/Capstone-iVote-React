import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee, FaFacebookSquare } from '@fortawesome/free-solid-svg-icons'
import { FaFacebookSquare, FaTwitterSquare, FaYoutubeSquare } from "react-icons/fa";

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './Reps.css'


const nonElectedPositions = ["Elections Director", "Assessor", "WA Supreme Court Justice", "State Auditor", "Commissioner of Public Lands", "Secretary of State", "State Treasurer", "Insurance Commissioner", "State Superintendent of Public Instruction"]
const socialMediaUrls = {
  Facebook: 'https://www.facebook.com/',
  Twitter: 'https://twitter.com/',
  YouTube: 'https://www.youtube.com/user/',
}

class Reps extends Component {

  componentDidMount() {
    // this.props.addErrorMessageCallback('', '')
    this.props.setCurrPageCallback('reps')
  }

  getSocialMediaIcon(type) {
    if (type === 'Facebook') {
      return (<FaFacebookSquare />)
    } else if (type === 'Twitter') {
      return (<FaTwitterSquare />)
    } else {
      return (<FaYoutubeSquare />)
    }
  }


  generateContactInfo(channels) {
    return channels.map((channel, i) => {
      return (
        <a key={i} href={`${socialMediaUrls[channel.type]}${channel.id}`} rel="noopener noreferrer" target="_blank">
          <li >{this.getSocialMediaIcon(channel.type)}{`${channel.id}`}</li>
        </a>
      )
    })
  }

  getUrlLi(url) {
    return (
      <a href={url} rel="noopener noreferrer" target="_blank">
        <li>Website</li>
      </a>
    )
  }
  generateReps(region) {
    const officials = (this.props.formattedRepData) ? this.props.formattedRepData[region] : [];
    console.log(this.props.formattedRepData)
    return officials.map((rep, i) => {
      const email = (rep.emails) ? `${rep.emails[0]}` : '';
      const socialMedia = (rep.channels) ? this.generateContactInfo(rep.channels) : [];
      const url = (rep.urls) ? this.getUrlLi(rep.urls[0]) : '';

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
                    <li>{rep.phones[0]}</li>
                    <li>{email}</li>
                    {url}
                  </ul>
                  <ul className="contact-info ">
                    <li className="bold">Social Media:</li>
                    {socialMedia}
                  </ul>
                  {/* <img className='rep-photo' src={rep.photoUrl} alt="official" /> */}
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
      // this.props.addErrorMessageCallback('We need to lookup your voter information to show this page.', 'warning')
      this.props.history.push('/Login')
      this.props.addErrorMessageCallback('We need to lookup your voter information to show this page.', 'warning')
    }
    return (
      <div>
        <h1 className='title'>Your Representatives</h1>
        {/* <p>{this.props.address}</p> */}
        <div className='flex-container'>
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

      </div>
    )
  }
}

export default withRouter(Reps);