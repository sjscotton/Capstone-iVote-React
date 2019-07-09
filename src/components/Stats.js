import React, { Component } from 'react';

import './Stats.css'

const ElectionDates = ['2017-08-01', '2017-11-07', '2018-02-13', '2018-08-07', '2018-11-06', '2019-02-12',];

class Stats extends Component {

  generateVotingBoxes(votingDates) {
    return ElectionDates.map((date) => {
      const style = votingDates.includes(date) ? "election-date voted" : "election-date missed";
      return (
        <div className={style}></div>
      )

    })
  }
  render() {
    return (
      <div>
        Stats
        {this.props.votingHistory}
        <div className="flex-container">

          {this.generateVotingBoxes(this.props.votingHistory)}
        </div>
      </div>
    )
  }
}

export default Stats;