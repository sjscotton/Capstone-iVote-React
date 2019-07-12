import React, { Component } from 'react';

import './Stats.css'

const ElectionDates = ['2017-02-14', '2017-04-25', '2017-08-01', '2017-11-07', '2018-02-13', '2018-04-24', '2018-08-07', '2018-11-06', '2019-02-12',];

class Stats extends Component {

  generateVotingBoxes(votingDates) {
    // return ElectionDates.map((date) => {
    //   const style = votingDates.includes(date) ? "election-date voted" : "election-date missed";
    //   return (
    //     <div className={style}></div>
    //   )

    // })
    console.log("max elections", this.props.maxElections)
    return Array(this.props.maxElections).fill().map((none, i) => {

      const style = votingDates.length > i ? "election-date voted" : "election-date missed";
      return (
        <div className={style}></div>
      )

    })


  }
  render() {
    const voteRecord = `You voted in ${this.props.votingHistory.length} of the last ${this.props.maxElections} elections.`
    return (
      <div>
        <h2>Stats</h2>
        <h4>{voteRecord}</h4>
        <div className="flex-container">

          {this.generateVotingBoxes(this.props.votingHistory)}
        </div>
      </div>
    )
  }
}

export default Stats;