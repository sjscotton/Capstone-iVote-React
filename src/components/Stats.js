import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import BarGraph from './BarGraph'
import PieGraph from './PieGraph'
import InfoCard from './InfoCard'
import './Stats.css'

const AgeGroups = ['18-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75-84', '85+']

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: this.props.voterInfo.stats,
      timesVoted: this.props.votingHistory.length
    }
  }

  componentDidMount() {
    this.props.setCurrPageCallback('stats')
  }
  generateVotingBoxes(votingDates) {
    console.log("inside generateVotingBoxes")
    return Array(this.props.voterInfo.maxElections).fill().map((none, i) => {
      const style = votingDates.length > i ? "vote" : "no-vote";
      return (
        <div className={`${style} sticker`} key={i}></div>
      )
    })
  }

  pieGraphVotingData(ageGroup) {
    console.log("inside piegraphdata")
    const data = this.props.voterInfo.stats[ageGroup]
    if (data) {
      const sampleSize = data.reduce((a, b) => a + b, 0)
      return data.map((voterFreq, i) => {
        const numVotes = (i === 0) ? '0' : i;
        if (voterFreq === 0) {
          return { label: '', y: '', percent: '' }
        }
        const data = { label: numVotes, y: voterFreq, percent: Math.round((voterFreq / sampleSize) * 100) }
        return data
      })
    }
  }
  onButtonClick = () => {
    this.props.history.push('/Share')
  }

  getOverallPercentile(stats) {
    const maxVotes = this.props.voterInfo.maxElections
    const flatArray = new Array(maxVotes + 1).fill(0)
    console.log(flatArray)
    for (const ageGroup of AgeGroups) {

      console.log(ageGroup)
      console.log(stats[ageGroup])
      if (stats[ageGroup]) {
        for (let i = 0; i <= maxVotes; i += 1) {
          flatArray[i] += stats[ageGroup][i]
        }
      }
    }
    console.log(flatArray)
    return flatArray


  }
  getPercentile(votingArray) {
    console.log(votingArray)

    const userVotes = this.state.timesVoted;
    // const totalVotes = votingArray.reduce((a, b) => a + b)
    let totalVotes = 0;
    let lowerBound = 0;
    let upperBound = 0;
    if (votingArray) {
      for (let i = 0; i < votingArray.length; i += 1) {
        totalVotes += votingArray[i]
      }
      console.log("GetPercentile", votingArray, totalVotes)
      for (let i = 0; i < userVotes; i += 1) {
        lowerBound += votingArray[i]
      }
      upperBound += lowerBound + votingArray[userVotes]
    }

    console.log("totalVotes, lowerBound, upperBound", totalVotes, lowerBound, upperBound)
    const average = (lowerBound + upperBound) / 2
    return Math.round((average / totalVotes) * 100)
  }
  render() {
    const stats = this.props.voterInfo.stats
    const ageGroup = this.props.voterInfo.ageGroup
    // const ageGroupPercentile = this.getPercentile(this.props.voterInfo.stats[this.props.voterInfo.ageGroup])
    const ageGroupPercentile = this.getPercentile(stats[ageGroup])
    const overallPercentile = this.getPercentile(this.getOverallPercentile(stats))
    console.log("overallPerentile", overallPercentile)

    console.log(ageGroupPercentile)
    // console.log("array", this.props.voterInfo.stats[this.props.voterInfo.ageGroup])
    // console.log("data", this.props.voterInfo.stats)
    // console.log("data", this.state.stats)
    console.log("voterInfo", this.props.voterInfo)
    // console.log("ageGroup", this.props.voterInfo.ageGroup)
    // console.log(this.state.timesVoted)
    // uncomment this to redirect if user not logged in
    if (!this.props.loggedIn) {
      this.props.history.push('/Login')
    }
    const age = this.props.voterInfo.ageGroup;
    const data = this.pieGraphVotingData(age);
    const voteRecord = `You voted in ${this.props.votingHistory.length} of the last ${this.props.voterInfo.maxElections} elections.`
    return (
      <div>

        <h1>Your Voting Statistics</h1>
        <h4>{voteRecord}</h4>
        <div className="flex-container">
          <div className="flex-container stickers-container">

            {this.generateVotingBoxes(this.props.votingHistory)}
          </div>

        </div>
        <div className='flex-container'>

          <Button
            onClick={this.onButtonClick}
            variant="contained"
            color="primary"
            type="submit"
            name="submit"
            value="create-image"
          >Create Sharable Image</Button>
        </div>
        <div className="flex-container">

          <PieGraph data={data} />
          <InfoCard percentile={ageGroupPercentile} group={age} />
          <InfoCard percentile={overallPercentile} />
          <BarGraph data={this.props.voterInfo.stats} maxVotes={this.props.voterInfo.maxElections} loggedIn={this.props.loggedIn} maxElections={this.props.maxElections} />

        </div>
      </div >
    )
  }
}

export default withRouter(Stats);