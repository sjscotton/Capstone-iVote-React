import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import LoginForm from './LoginForm'

const BaseUrl = 'http://localhost:8000/ivote/'
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      voterID: '',
      address: '',
      otherAddresses: []

    }
  }

  componentDidMount() {
    axios.get(BaseUrl + 'address')
      .then((response) => {
        console.log(response.data.addresses)
        this.setState({ otherAddresses: response.data.addresses })
      })
      .catch((error) => {
        console.log(error.message)
      })

  }


  getVoter = (userParams) => {

    const queryParams = {
      first_name: userParams.firstName,
      last_name: userParams.lastName,
      birthdate: `${userParams.month}-${userParams.day}-${userParams.year}`
    }
    console.log(queryParams, "inside getVoter")
    axios.get(BaseUrl + 'voter', { params: queryParams })
      .then((response) => {
        const data = response.data
        const newState = {
          firstName: data.first_name,
          lastName: data.last_name,
          voterID: data.voter_id,
          address: data.address
        }
        this.setState(newState)
        this.getVotingHistory(data.voter_id)
        this.getElectionDates(data.county_code, data.city)
      })
      .catch((error) => {
        console.log(error.message)

      })
  }

  getVotingHistory(voterID) {
    console.log("inside getVotingHistory")
    axios.get(BaseUrl + 'vote_dates', { params: { state_voter_id: voterID } })
      .then((response) => {
        console.log(response.data.voting_days)
        this.setState({ votingHistory: response.data.voting_days })
        // this.props.setVotingHistoryCallback(response.data.voting_days)
        this.props.loginCallback(response.data.voting_days)
        this.props.history.push('/Stats')
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  getElectionDates(countyCode, city) {
    axios.get(BaseUrl + 'elections', { params: { county_code: countyCode, city: city } })
      .then((response) => {
        console.log("inside getElectionDates", response.data)
        this.props.setElectionDatesCallback(response.data.max_elections)
      })
      .catch((error) => {
        console.log(error)
      })
  }



  render() {
    console.log("Login state", this.state)
    return (
      <div>
        <h2 className='page-title'></h2>
        <LoginForm
          getVoterCallback={this.getVoter} />

      </div>
    )
  }
}

export default withRouter(Login);
