import React, { Component } from 'react';


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      month: '',
      day: '',
      year: '',

    }
  }
  onInputChange = (event) => {
    const updatedState = {};
    // console.log(event.target.name)
    // console.log(event.target.value)
    updatedState[event.target.name] = event.target.value;
    this.setState(updatedState);
  }

  onSubmit = (event) => {
    console.log("in prevent default")
    event.preventDefault();
    this.props.getVoterCallback(this.state)
    this.setState({
      firstName: '',
      lastName: '',

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
        Birthdate
        Month:
        <input
          name="month"
          type="text"
          value={this.state.month}
          onChange={this.onInputChange}
          placeholder="02"
        ></input>
        Day:
        <input
          name="day"
          type="text"
          value={this.state.day}
          onChange={this.onInputChange}
          placeholder="20"
        ></input>
        Year:
        <input
          name="year"
          type="text"
          value={this.state.year}
          onChange={this.onInputChange}
          placeholder="1984"
        ></input>

        <button
          type="submit"
          name="submit"
          value="search"
        >Find me!</button>
      </form >
    )
  }
}

export default LoginForm;