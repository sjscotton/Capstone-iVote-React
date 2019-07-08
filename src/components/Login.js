import React, { Component } from 'react';
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

    }
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
        console.log(response)
        console.log(response.data.voter_id)
        const data = response.data
        const newState = {
          firstName: data.first_name,
          lastName: data.last_name,
          voterID: data.voter_id,
          address: data.address
        }
        this.setState(newState)
        this.getVotingHistory(data.voter_id)
      })
      .catch((error) => {
        console.log(error.message)
        console.log(error.body)
      })
  }

  getVotingHistory(voterID) {
    console.log("inside getVotingHistory")
    axios.get(BaseUrl + 'vote_dates', { params: { state_voter_id: voterID } })
      .then((response) => {
        console.log(response)
        console.log(response.data.voting_days)
        this.setState(newState)
      })
      .catch((error) => {
        console.log(error.message)
        console.log(error.body)
      })
  }



  render() {
    console.log(this.state)
    return (
      <div>
        Login
        <LoginForm
          getVoterCallback={this.getVoter} />
      </div>
    )
  }
}

export default Login;
