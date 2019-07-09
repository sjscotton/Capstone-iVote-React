import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from './Login'
import Stats from './Stats'
import Reps from './Reps'



class AppRouter extends Component {


  constructor(props) {
    super(props);
    this.state = {
      votingHistory: []
    }
  }

  setVotingHistory = (votingDates) => {
    console.log("inside setVotingHistory", votingDates)
    this.setState({ votingHistory: votingDates })
  }
  render() {
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
                  setVotingHistoryCallback={this.setVotingHistory} />}
            />
            <Route
              path="/stats/"
              // component={Library}
              render={(props) =>
                <Stats
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
