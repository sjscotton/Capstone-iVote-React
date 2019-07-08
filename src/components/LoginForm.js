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
        <lable htmlFor="firstName">First Name:</lable>
        <input
          name="firstName"
          type="text"
          value={this.state.firstName}
          onChange={this.onInputChange}
        >
        </input>
      </form>
    )
  }
}

export default LoginForm;