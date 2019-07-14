import React, { Component } from 'react';
import BarChart from './BarChart'
import PieGraph from './PieGraph'
import './Stats.css'



class Stats extends Component {

  generateVotingBoxes(votingDates) {
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
        <div className="graph-container">
          <BarChart />
          <PieGraph />
        </div>
      </div>
    )
  }
}

export default Stats;