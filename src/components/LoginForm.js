import React, { Component } from 'react';


import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
    console.log(event.target.name)
    console.log(event.target.value)
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
              {/* <input
              name="firstName"
              type="text"
              value={this.state.firstName}
              onChange={this.onInputChange}
            /> */}
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
              {/* <input
              name="lastName"
              type="text"
              value={this.state.lastName}
              onChange={this.onInputChange}
            /> */}
            </TextField>
          </div>
          <h3>Birthday</h3>
          <div className='form-field'>
            <TextField
              className='mdc-text-field--outlined'
              label='Month'
              variant="outlined"
              name="month"
              type="text"
              value={this.state.month}
              onChange={this.onInputChange}>
              <input
              // name="month"
              // type="text"
              // value={this.state.month}
              // onChange={this.onInputChange}

              />
            </TextField>
          </div>
          <div className='form-field'>
            <TextField
              className='mdc-text-field--outlined'
              label='Day'
              variant="outlined"
              name="day"
              type="text"
              value={this.state.day}
              onChange={this.onInputChange}>

              {/* <input
              name="day"
              type="text"
              value={this.state.day}
              onChange={this.onInputChange}
              placeholder="20"
            /> */}
            </TextField>
          </div>
          <div className='form-field'>
            <TextField
              className='mdc-text-field--outlined'
              label='Year'
              variant="outlined"
              name="year"
              type="text"
              value={this.state.year}
              onChange={this.onInputChange}>
              {/* <input
              name="year"
              type="text"
              value={this.state.year}
              onChange={this.onInputChange}
              placeholder="1984"
            /> */}
            </TextField>
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

export default LoginForm;