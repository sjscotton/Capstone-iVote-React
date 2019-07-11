import React, { Component } from 'react';


import TextField from '@material-ui/core/TextField';
import './LoginForm.css'



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
      <section>
        <form
          onSubmit={this.onSubmit}>
          <h3>Name:</h3>
          <TextField
            className='mdc-text-field--outlined'
            label='First Name'
            variant="outlined">
            <input
              name="firstName"
              type="text"
              value={this.state.firstName}
              onChange={this.onInputChange}
            />
          </TextField>
          <h3>Last Name:</h3>
          <TextField
            className='mdc-text-field--outlined'
            label='First Name'
            variant="outlined">
            <input
              name="lastName"
              type="text"
              value={this.state.lastName}
              onChange={this.onInputChange}
            />
          </TextField>

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
      </section >
    )
  }
}

export default LoginForm;