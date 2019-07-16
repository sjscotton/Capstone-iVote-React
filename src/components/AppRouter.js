import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from './Login'
import Stats from './Stats'
import Reps from './Reps'
import axios from 'axios';
import './AppRouter.css'

const baseUrl = 'http://localhost:8000/ivote/'

class AppRouter extends Component {


  constructor(props) {
    super(props);
    this.state = {
      votingHistory: [],
      loggedIn: false,
      electionDates: [],
      maxElections: 0,
      voterID: '',
      city: '',
      countyCode: '',
      ageGroup: '',
      address: '',
      repsData: [],
      stats: {}
    }
  }

  getStats() {
    // console.log(this.props)
    const queryParams = {
      params: {
        city: this.state.city,
        // county_code: this.state.countyCode,
        // age_group: this.state.ageGroup
      }
    }
    // console.log(queryParams)
    axios.get(baseUrl + 'stats', queryParams)
      .then((response) => {
        // console.log(response.data.stats)
        this.setState({ stats: response.data.stats, maxElections: (response.data.stats["18-24"].length - 1) })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  getReps() {
    console.log("inside getReps", this.state.address)
    const queryParams = { params: { address: this.state.address } }
    axios.get(baseUrl + 'reps', queryParams)
      .then((response) => {
        console.log(response.data)
        this.setState({ repsData: response.data.reps })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  login = (voterInfo) => {
    // console.log("inside login", voterInfo)
    const newState = {
      loggedIn: true,
      votingHistory: voterInfo.votingHistory,
      voterID: voterInfo.voterID,
      city: voterInfo.city,
      countyCode: voterInfo.countyCode,
      ageGroup: voterInfo.ageGroup,
      address: voterInfo.address,
    }
    this.setState(newState)
    this.getStats()
    this.getReps()

  }
  setLogout = () => {
    this.setState({ loggedIn: false })
  }
  setElectionDates = (maxElections) => {
    // this.setState({ maxElections: maxElections })
  }
  render() {
    // console.log("AppRouter state", this.state)
    return (
      <Router>
        <div className="App">
          <nav className="nav-bar">
            <ul className="nav-list">
              <li>
                <Link to="/login/">Find Me!</Link>
              </li>
              <li>
                <Link to="/stats/">My Stats</Link>
              </li>
              <li>
                <Link to="/reps/">My Reps</Link>
              </li>
            </ul>
          </nav>
          <main >

            <Route
              path="/login/"
              // component={Search} 
              render={(props) =>
                <Login
                  // setVotingHistoryCallback={this.setVotingHistory}
                  loginCallback={this.login}
                  loggedIn={this.state.loggedIn}
                  setElectionDatesCallback={this.setElectionDates}
                  baseUrl={baseUrl} />}
            />
            <Route
              path="/stats/"
              // component={Library}
              render={(props) =>
                <Stats
                  votingHistory={this.state.votingHistory}
                  loggedIn={this.state.loggedIn}
                  // maxElections={this.state.maxElections}
                  voterInfo={this.state}
                // baseUrl={baseUrl}
                />}
            />
            <Route
              path="/reps/"
              render={(props) =>
                <Reps
                  address={this.state.address}
                  repsData={this.state.repsData}

                />}
            />
          </main>
        </div>
      </Router >
    );
  };
};

export default AppRouter;
