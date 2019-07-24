import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
      rememberMe: false,

    }
  }
  onInputChange = (event) => {

    const updatedState = {};
    updatedState[event.target.name] = event.target.value;
    this.setState(updatedState);
  }
  toggleCheckbox = (event) => {
    this.setState({ rememberMe: !this.state.rememberMe });
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (!this.state.rememberMe) {
      localStorage.clear();
    }
    this.props.getVoterCallback(this.state)
    this.props.history.push('/Loading')
  }



  render() {
    return (
      <section>
        <form
          onSubmit={this.onSubmit}>
          <h3>Name</h3>
          <div className='form-field'>

            <TextField
              className='mdc-text-field--outlined'
              label='First'
              variant="outlined"
              name="firstName"
              type="text"
              value={this.state.firstName}
              onChange={this.onInputChange}
            >
            </TextField></div>
          <div className='form-field'>
            <TextField
              className='mdc-text-field--outlined form-field'
              label='Last'
              variant="outlined"
              name="lastName"
              type="text"
              value={this.state.lastName}
              onChange={this.onInputChange}>
            </TextField>
          </div>
          <h3>Birthday</h3>
          <div className='form-field'>
            <TextField
              className='mdc-text-field--outlined'
              label='Month-MM'
              variant="outlined"
              name="month"
              type="text"
              inputProps={{
                maxLength: 2,
              }}
              value={this.state.month}
              onChange={this.onInputChange}>

            </TextField>
          </div>
          <div className='form-field'>
            <TextField
              className='mdc-text-field--outlined'
              label='Day-DD'
              variant="outlined"
              name="day"
              type="text"
              inputProps={{
                maxLength: 2,
              }}
              value={this.state.day}
              onChange={this.onInputChange}>
            </TextField>
          </div>
          <div className='form-field'>
            <TextField
              className='mdc-text-field--outlined'
              label='Year-YYYY'

              variant="outlined"
              name="year"
              type="text"
              inputProps={{
                maxLength: 4,
              }}
              value={this.state.year}
              onChange={this.onInputChange}>
            </TextField>
          </div>
          <div>
            <FormControlLabel
              value="top"
              control={<Checkbox
                color="primary"
                checked={this.state.rememberMe}
                onChange={this.toggleCheckbox}
                value={this.state.rememberMe}
                name="rememberMe" />}
              label="Remember me"
            // labelPlacement="right"
            />
          </div>
          <div className='btn'>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              name="submit"
              value="search"
            >Find me!</Button>
          </div>

        </form >
      </section >
    )
  }
}

export default withRouter(LoginForm);