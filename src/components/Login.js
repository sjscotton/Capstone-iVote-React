import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import LoginForm from './LoginForm'

import logo from '../images/ivote.png';
import './Login.css'

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      voterID: '',
      address: '',
      errorMessage: '',

    }
  }

  componentDidMount() {

    this.props.setCurrPageCallback('login')
    const voterID = localStorage.getItem('voterID')
    if (voterID && !this.props.loggedIn) {
      this.getVoter({ voterID: voterID })
    }
  }


  getVoter = (userParams) => {

    const queryParams = {
      first_name: userParams.firstName,
      last_name: userParams.lastName,
      birthdate: `${userParams.month}-${userParams.day}-${userParams.year}`,
      voter_id: userParams.voterID
    }
    axios.get(this.props.baseUrl + 'voter', { params: queryParams })
      .then((response) => {
        const data = response.data
        const voterInfo = {
          firstName: data.first_name,
          lastName: data.last_name,
          voterID: data.voter_id,
          city: data.city,
          address: data.address,
          countyCode: data.county_code,
          ageGroup: data.age_group,
          rememberMe: userParams.rememberMe,
        }
        if (voterInfo.rememberMe) {
          localStorage.setItem('voterID', voterInfo.voterID)
        }
        this.props.addErrorMessageCallback('', '')
        this.props.addVoterCallback(voterInfo)
        this.getVotingHistory({ rememberMe: userParams.rememberMe, voterID: data.voter_id, })
      })
      .catch((error) => {
        console.log(error.message)
        if (error.message === 'Request failed with status code 400') {
          const message = "Cant make request, ensure all form fields are filled out"
          this.props.addErrorMessageCallback(message, 'warning')
        } else {
          console.log('404')
          const message = <p>Unable to find voter information. Please make sure all fields are as they appear on your washington state voting registration. You can check your voter registration or register to vote at <a href="https://www.sos.wa.gov/elections/voters/">https://www.sos.wa.gov</a>.</p>
          // const link = <a href="https://www.sos.wa.gov/elections/voters/">https://www.sos.wa.gov</a>
          this.props.addErrorMessageCallback(message, 'warning')
        }
        this.props.history.push('/Login')
      })
  }

  getVotingHistory(voterInfo) {
    const returningUser = (localStorage.getItem('voterID')) ? true : false;
    const rememberMe = (voterInfo.rememberMe) ? true : false;
    axios.get(this.props.baseUrl + 'vote_dates', { params: { state_voter_id: voterInfo.voterID, returning_user: returningUser, remember_me: rememberMe } })
      .then((response) => {
        voterInfo.votingHistory = response.data.voting_days
        this.props.loginCallback(voterInfo)
        this.props.history.push('/Stats')
      })
      .catch((error) => {
        console.log(error.message)
        this.props.history.push('/Login')
      })
  }


  render() {
    return (

      <div >
        <div className='flex-container login'>
          <div className='left-side'>
            <img className='logo main-logo' src={logo} alt="logo"></img>

            {/* <h2 className='sub-header'>Welcome!</h2> */}

            <p className='login-text text'>Curious about how often you and people in your area vote? Do I Vote is tool that shows your voting history and how it compares to people in your area.</p>
            <p className='login-text text'>Just enter your name and birthdate as they appear on your Washington State voter registration and well find your voting history!</p>
            <p className='login-text text'>Data currently contains voting history from February 2017 to February 2019</p>

          </div>
          <div className='right-side'>
            <LoginForm
              clearNameCallback={this.props.clearNameCallback}
              getVoterCallback={this.getVoter}
              addErrorMessageCallback={this.props.addErrorMessageCallback} />
          </div>
        </div>
      </div >



      // <div >
      //   <div className='flex-container'>
      //     <img className='logo' src={logo} alt="logo"></img>
      //   </div>
      //   <h2 className='sub-header'>Welcome!</h2>
      //   <div className='flex-container'>
      //     <div className='text-container'>
      //       <p className='text'>Do I Vote is tool that shows your voting history and how it compares to people in your area.</p>
      //       <p className='text'>Please enter your name as it appears on your Washington State voter registration.</p>
      //     </div>
      //   </div>
      //   <LoginForm
      //     clearNameCallback={this.props.clearNameCallback}
      //     getVoterCallback={this.getVoter}
      //     addErrorMessageCallback={this.props.addErrorMessageCallback} />

      // </div>
    )
  }
}

export default withRouter(Login);
