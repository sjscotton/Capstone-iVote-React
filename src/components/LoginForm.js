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
    localStorage.clear();
    if (!this.state.rememberMe) {
      localStorage.clear();
    }
    this.props.clearNameCallback()
    this.props.addErrorMessageCallback('', '')
    const userData = this.state
    userData.firstName = userData.firstName.trim()
    userData.lastName = userData.lastName.trim()
    this.props.getVoterCallback(userData)
    this.props.history.push('/Loading')
  }

  render() {
    return (
      <section className='login-form'>
        <form
          onSubmit={this.onSubmit}>
          <h3 className='form-label'>Your Name</h3>
          <div className='form-field'>
            <TextField
              fullWidth
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
              fullWidth
              label='Last'
              variant="outlined"
              name="lastName"
              type="text"
              value={this.state.lastName}
              onChange={this.onInputChange}>
            </TextField>
          </div>
          <h3 className='form-label date-label'>Your Date of Birth</h3>
          <div className='form-field date-field'>
            <TextField
              className='mdc-text-field--outlined'
              label='Month-MM'
              variant="outlined"
              name="month"
              type="text"
              style={{ width: 138 }}
              inputProps={{
                maxLength: 2,
              }}
              value={this.state.month}
              onChange={this.onInputChange}>

            </TextField>
          </div>
          <div className='form-field date-field'>
            <TextField
              className='mdc-text-field--outlined'
              label='Day-DD'
              variant="outlined"
              name="day"
              type="text"
              style={{ width: 138 }}
              inputProps={{
                maxLength: 2,
              }}
              value={this.state.day}
              onChange={this.onInputChange}>
            </TextField>
          </div>
          <div className='form-field date-field '>
            <TextField
              className='mdc-text-field--outlined'
              label='Year-YYYY'
              style={{ width: 170 }}
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
          <div className='checkbox'>
            <FormControlLabel
              value="top"
              control={<Checkbox
                color="primary"
                checked={this.state.rememberMe}
                onChange={this.toggleCheckbox}
                value={this.state.rememberMe}
                name="rememberMe" />}
              label="Remember me"
            />
          </div>
          <div className='btn'>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              name="submit"
              value="search"
              size="large"
            >Find my voting history!</Button>
          </div>


        </form >
      </section >
    )
  }
}

export default withRouter(LoginForm);