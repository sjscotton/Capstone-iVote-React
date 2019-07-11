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
      // firstName: '',
      // lastName: '',

    })
  }



  render() {
    return (
      <form
        onSubmit={this.onSubmit}>
        <h3>First Name:</h3>
        <input
          name="firstName"
          type="text"
          value={this.state.firstName}
          onChange={this.onInputChange}
        >
        </input>
        <h3>Last Name:</h3>
        <input
          name="lastName"
          type="text"
          value={this.state.lastName}
          onChange={this.onInputChange}
        >
        </input>
        <h3>Birthdate</h3>
        <h4>Month:</h4>
        <input
          name="month"
          type="text"
          value={this.state.month}
          onChange={this.onInputChange}
          placeholder="02"
        ></input>
        <h4>Day:</h4>
        <input
          name="day"
          type="text"
          value={this.state.day}
          onChange={this.onInputChange}
          placeholder="20"
        ></input>
        <h4>Year:</h4>
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