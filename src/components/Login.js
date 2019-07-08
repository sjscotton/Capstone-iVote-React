import React, { Component } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm'

const BaseUrl = 'http://localhost:8000/ivote/'
class Login extends Component {

  getVoter = (userParams) => {

    const queryParams = {
      first_name: userParams.firstName,
      last_name: userParams.lastName,
      birthdate: `${userParams.month}-${userParams.day}-${userParams.year}`
      // month: userParams.month,
      // day: userParams.day,
      // year: userParams.year
    }
    console.log(queryParams, "inside getVoter")
    axios.get(BaseUrl + 'voter', { params: queryParams })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error.message)
        console.log(error.body)
      })

  }
  render() {
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
