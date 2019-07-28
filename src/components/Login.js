import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import LoginForm from './LoginForm'

// import './Login.css'

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
    console.log("inside Login ComponentDidMount")
    const voterID = localStorage.getItem('voterID')
    console.log(voterID)
    if (voterID && !this.props.loggedIn) {
      console.log('calling getVOter')
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
    console.log(userParams.rememberMe)
    console.log(queryParams, "inside getVoter")
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
        this.props.addVoterCallback(voterInfo)
        this.getVotingHistory({ rememberMe: userParams.rememberMe, voterID: data.voter_id, })
      })
      .catch((error) => {
        console.log(error.message)
        this.props.history.push('/Login')
      })
  }

  getVotingHistory(voterInfo) {
    console.log("inside getVotingHistory")
    const returningUser = (localStorage.getItem('voterID')) ? true : false;
    const rememberMe = (voterInfo.rememberMe) ? true : false;
    axios.get(this.props.baseUrl + 'vote_dates', { params: { state_voter_id: voterInfo.voterID, returning_user: returningUser, remember_me: rememberMe } })
      .then((response) => {

        voterInfo.votingHistory = response.data.voting_days
        console.log("+++++++++++++++++++++++++++++++")
        console.log("voterInfo", voterInfo)
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
        <h2 className='sub-header'>Welcome!</h2>
        <div className='flex-container'>
          <div className='text-container'>
            <p className='text'>iVote is tool that shows your voting history and how it compares to people in your area.</p>
            <p className='text'>Please enter your name as it appears on your Washington State voter registration.</p>
          </div>
        </div>
        <LoginForm
          getVoterCallback={this.getVoter} />

      </div>
    )
  }
}

export default withRouter(Login);
