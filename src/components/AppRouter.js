import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router'

import Login from './Login'
import Stats from './Stats'
import Reps from './Reps'
import Loading from './Loading'
import axios from 'axios';
import './AppRouter.css'

const baseUrl = 'http://localhost:7000/ivote/'
// const baseUrl = 'http://ec2-34-212-21-218.us-west-2.compute.amazonaws.com/ivote/'

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

      formattedRepData: null,
      stats: {}
    }
  }


  getStats() {
    console.log("inside getStats")
    const queryParams = {
      params: {
        city: this.state.city,
      }
    }

    axios.get(baseUrl + 'stats', queryParams)
      .then((response) => {
        this.setState({ stats: response.data.stats, maxElections: (response.data.stats["18-24"].length - 1) })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  getReps() {
    console.log("inside getReps")
    const queryParams = { params: { address: this.state.address } }
    axios.get(baseUrl + 'reps', queryParams)
      .then((response) => {
        console.log(response.data)
        this.formatRepsData(response.data.reps)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  formatRepsData(repsData) {
    console.log("inside formatRepsData")
    const formattedData = { country: [], state: [], county: [], place: [] };
    const officials = repsData.officials;
    const offices = repsData.offices;

    for (const office of offices) {
      const divisionIDs = office.divisionId.split('/')
      let region = (divisionIDs[divisionIDs.length - 1].split(':')[0])
      if (!formattedData[region]) {
        region = (divisionIDs[divisionIDs.length - 2].split(':')[0])
      }
      for (const officeIndex of office.officialIndices) {
        officials[officeIndex].title = office.name
        formattedData[region].push(officials[officeIndex])
      }
    }
    this.setState({ formattedRepData: formattedData })

  }
  login = (voterInfo) => {
    console.log(voterInfo)
    const newState = {
      loggedIn: true,
      votingHistory: voterInfo.votingHistory,
      voterID: voterInfo.voterID,
      city: voterInfo.city,
      countyCode: voterInfo.countyCode,
      ageGroup: voterInfo.ageGroup,
      address: voterInfo.address,
      firstName: voterInfo.firstName,
      lastName: voterInfo.lastName

    }
    if (voterInfo.rememberMe) {
      localStorage.setItem('voterID', voterInfo.voterID)
    }
    this.setState(newState)
    this.getStats()
    this.getReps()

  }
  setLogout = () => {
    this.setState({ loggedIn: false })
  }
  setElectionDates = (maxElections) => {
  }
  render() {
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
              render={(props) =>
                <Login
                  loginCallback={this.login}
                  loggedIn={this.state.loggedIn}
                  setElectionDatesCallback={this.setElectionDates}
                  baseUrl={baseUrl} />}
            />
            <Route
              path="/stats/"
              render={(props) =>
                <Stats
                  votingHistory={this.state.votingHistory}
                  loggedIn={this.state.loggedIn}
                  maxElections={this.state.maxElections}
                  voterInfo={this.state}
                />}
            />
            <Route
              path="/reps/"
              render={(props) =>
                <Reps
                  address={this.state.address}
                  formattedRepData={this.state.formattedRepData}
                  loggedIn={this.state.loggedIn}

                />}
            />
            <Route
              path="/loading/"
              render={(props) =>
                <Loading




                />}
            />
            <Redirect exact from="/" to="/Login" />

          </main>
        </div>
      </Router >
    );
  };
};

export default AppRouter;
