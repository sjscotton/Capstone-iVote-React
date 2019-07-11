import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from './Login'
import Stats from './Stats'
import Reps from './Reps'

import './AppRouter.css'

class AppRouter extends Component {


  constructor(props) {
    super(props);
    this.state = {
      votingHistory: [],
      loggedIn: false,
      electionDates: [],
    }
  }


  login = (votingDates) => {
    const newState = {
      loggedIn: true,
      votingHistory: votingDates
    }
    this.setState(newState)
  }
  setLogout = () => {
    this.setState({ loggedIn: false })
  }
  setElectionDates = (electionDates) => {
    this.setState({ electionDates: electionDates })
  }
  render() {
    console.log("logged in", this.state)
    return (
      <Router>
        <div className="App">
          <nav className="nav-bar">
            <ul className="nav-list">
              <li>
                <Link to="/login/">Login</Link>
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
                  setVotingHistoryCallback={this.setVotingHistory}
                  loginCallback={this.login}
                  loggedIn={this.state.loggedIn}
                  setElectionDatesCallback={this.setElectionDates} />}
            />
            <Route
              path="/stats/"
              // component={Library}
              render={(props) =>
                <Stats
                  votingHistory={this.state.votingHistory}
                  loggedIn={this.state.loggedIn}
                />}
            />
            <Route
              path="/reps/"
              render={(props) =>
                <Reps
                />}
            />
          </main>
        </div>
      </Router >
    );
  };
};

export default AppRouter;
