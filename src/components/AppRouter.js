import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router'


import Login from './Login'
import Stats from './Stats'
import Reps from './Reps'
import Loading from './Loading'
import Share from './Share'
import ErrorMessage from './ErrorMessage'
import axios from 'axios';
import './AppRouter.css'


// const baseUrl = 'http://localhost:7000/ivote/'
const baseUrl = 'http://ec2-34-212-21-218.us-west-2.compute.amazonaws.com/ivote/'

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

      currPage: '',

      formattedRepData: null,
      stats: {},
      errorMessage: '',
      errorStyle: '',
      percentile: '',

    }
  }
  addErrorMessage = (message, style) => {
    this.setState({
      errorMessage: message,
      errorStyle: style,
    })
  }

  addPercentile = (percentileArray) => {
    this.setState({ percentile: percentileArray })
  }
  clearName = () => {
    this.setState({
      firstName: '',
      percentile: '',
      ageGroup: '',
      stats: {},
      loggedIn: false,
    })
  }
  getStats() {
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
    const queryParams = { params: { address: this.state.address } }
    axios.get(baseUrl + 'reps', queryParams)
      .then((response) => {
        this.formatRepsData(response.data.reps)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  formatRepsData(repsData) {
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
    const newState = {
      loggedIn: true,
      votingHistory: voterInfo.votingHistory,
    }
    this.setState(newState)
    this.getStats()
    this.getReps()
  }
  addVoter = (voterInfo) => {
    const newState = {
      voterID: voterInfo.voterID,
      city: voterInfo.city,
      countyCode: voterInfo.countyCode,
      ageGroup: voterInfo.ageGroup,
      address: voterInfo.address,
      firstName: voterInfo.firstName,
      lastName: voterInfo.lastName
    }
    this.setState(newState)
  }

  setLogout = () => {
    this.setState({ loggedIn: false })
  }

  setCurrPage = (page) => {
    this.setState({ currPage: page })
  }

  render() {
    const login = (this.state.currPage === 'login') ? 'active' : '';
    const stats = (this.state.currPage === 'stats') ? 'active' : '';
    const reps = (this.state.currPage === 'reps') ? 'active' : '';
    return (
      <Router>
        <div className="App">
          <nav className="nav-bar">
            <ul className="nav-list">
              <li className={login}>
                <Link to="/login/">Find Me!</Link>
              </li>
              <li className={stats}>
                <Link to="/stats/">My Stats</Link>
              </li>
              <li className={reps}>
                <Link to="/reps/">My Reps</Link>
              </li>
            </ul>
          </nav>
          <main >

            <Route
              path="/login/"
              render={(props) =>
                <Login
                  addVoterCallback={this.addVoter}
                  loginCallback={this.login}
                  loggedIn={this.state.loggedIn}
                  setElectionDatesCallback={this.setElectionDates}
                  baseUrl={baseUrl}
                  setCurrPageCallback={this.setCurrPage}
                  addErrorMessageCallback={this.addErrorMessage}
                  clearNameCallback={this.clearName} />}
            />
            <Route
              path="/stats/"
              render={(props) =>
                <Stats
                  votingHistory={this.state.votingHistory}
                  loggedIn={this.state.loggedIn}
                  maxElections={this.state.maxElections}
                  voterInfo={this.state}
                  setCurrPageCallback={this.setCurrPage}
                  addErrorMessageCallback={this.addErrorMessage}
                  addPercentileCallback={this.addPercentile}
                  percentile={this.state.percentile}
                  city={this.state.city}
                />}
            />
            <Route
              path="/reps/"
              render={(props) =>
                <Reps
                  address={this.state.address}
                  formattedRepData={this.state.formattedRepData}
                  loggedIn={this.state.loggedIn}
                  setCurrPageCallback={this.setCurrPage}
                  addErrorMessageCallback={this.addErrorMessage}

                />}
            />
            <Route
              path="/loading/"
              render={(props) =>
                <Loading
                  firstName={this.state.firstName}
                />}
            />
            <Route
              path="/share/"
              render={(props) =>
                <Share
                  firstName={this.state.firstName}
                  maxElections={this.state.maxElections}
                  numVotes={this.state.votingHistory.length}
                  setCurrPageCallback={this.setCurrPage}
                  percentile={this.state.percentile}
                  ageGroup={this.state.ageGroup}
                  city={this.state.city}

                />}
            />
            <Redirect exact from="/" to="/Login" />
            <ErrorMessage
              message={this.state.errorMessage}
              link={this.state.errorLink}
              addErrorMessageCallback={this.addErrorMessage}
              errorStyle={this.state.errorStyle} />
          </main>
        </div>
      </Router >
    );
  };
};

export default AppRouter;
