import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import BarGraph from './BarGraph'
import PieGraph from './PieGraph'
import './Stats.css'



class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: this.props.voterInfo.stats
    }
  }


  generateVotingBoxes(votingDates) {
    // console.log("max elections", this.props.voterInfo.maxElections)
    return Array(this.props.voterInfo.maxElections).fill().map((none, i) => {

      const style = votingDates.length > i ? "election-date voted" : "election-date missed";
      return (
        <div className={style} key={i}></div>
      )
    })
  }

  pieGraphVotingData(ageGroup) {
    const data = this.props.voterInfo.stats[ageGroup]
    // console.log("in pieGraphVotingData", ageGroup, data)
    if (data) {
      const sampleSize = data.reduce((a, b) => a + b, 0)
      // console.log(sampleSize)
      return data.map((voterFreq, i) => {
        const numVotes = (i === 0) ? '0' : i;
        if (voterFreq === 0) {
          return { label: '', y: '', percent: '' }
        }
        const data = { label: numVotes, y: voterFreq, percent: Math.round((voterFreq / sampleSize) * 100) }
        // console.log("in map", Math.round(voterFreq / sampleSize), voterFreq, data)
        return data

      })
    }
  }
  render() {
    // uncomment this to redirect if user not logged in
    // if (!this.props.loggedIn) {
    //   this.props.history.push('/Login')
    // }


    const ageGroup = this.props.voterInfo.ageGroup;
    // const stats = this.props.voterInfo.stats[ageGroup]

    const data = this.pieGraphVotingData(ageGroup);
    // console.log("in stats render", ageGroup, data)
    const voteRecord = `You voted in ${this.props.votingHistory.length} of the last ${this.props.voterInfo.maxElections} elections.`
    return (
      <div>
        <h2>Stats</h2>
        <h4>{voteRecord}</h4>
        <div className="flex-container">

          {this.generateVotingBoxes(this.props.votingHistory)}
        </div>
        <div className="graph-container">
          <BarGraph data={this.props.voterInfo.stats} maxVotes={this.props.voterInfo.maxElections} loggedIn={this.props.loggedIn} />
          <PieGraph data={data} />
        </div>
      </div>
    )
  }
}

export default withRouter(Stats);