import React, { Component } from 'react';


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      birthdate: '',
    }
  }
  onInputChange = (event) => {
    const updatedState = {};
    console.log(event.target.name)
    console.log(event.target.value)
    updatedState[event.target.name] = event.target.value;
    this.setState(updatedState);
  }

  onSubmit = (event) => {
    console.log("in prevent default")
    event.preventDefault();
    this.setState({
      firstName: '',
      lastName: '',
      birthdate: '',
    })
  }

  render() {
    return (
      <form
        onSubmit={this.onSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          name="firstName"
          type="text"
          value={this.state.firstName}
          onChange={this.onInputChange}
        >
        </input>
        <label htmlFor="lastName">Last Name:</label>
        <input
          name="lastName"
          type="text"
          value={this.state.lastName}
          onChange={this.onInputChange}
        >
        </input>
        <label htmlFor="birthdate">Birthdate:</label>
        <input
          name="birthdate"
          type="text"
          value={this.state.birthdate}
          onChange={this.onInputChange}
          placeholder="MM/DD/YYYY"
        >
        </input>
      </form>
    )
  }
}

export default LoginForm;