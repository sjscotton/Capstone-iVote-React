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
    // this.props.addErrorMessageCallback('', '')
    this.props.setCurrPageCallback('stats')
  }
  generateVotingBoxes(votingDates) {
    return Array(this.props.voterInfo.maxElections).fill().map((none, i) => {
      const style = votingDates.length > i ? "vote" : "no-vote";
      return (
        <div className={`${style} sticker`} key={i}></div>
      )
    })
  }

  onButtonClick = () => {
    this.props.history.push('/Share')
  }

  getOverallPercentile(stats) {
    const maxVotes = this.props.voterInfo.maxElections
    const flatArray = new Array(maxVotes + 1).fill(0)
    for (const ageGroup of AgeGroups) {
      if (stats[ageGroup]) {
        for (let i = 0; i <= maxVotes; i += 1) {
          flatArray[i] += stats[ageGroup][i]
        }
      }
    }
    return flatArray


  }
  getPercentile(votingArray) {

    const userVotes = this.state.timesVoted;
    let totalVotes = 0;
    let lowerBound = 0;
    let upperBound = 0;
    if (votingArray) {
      for (let i = 0; i < votingArray.length; i += 1) {
        totalVotes += votingArray[i]
      }
      for (let i = 0; i < userVotes; i += 1) {
        lowerBound += votingArray[i]
      }
      upperBound += lowerBound + votingArray[userVotes]
    }

    const average = (lowerBound + upperBound) / 2
    return Math.round((average / totalVotes) * 100)
  }
  render() {

    const percentile = this.props.percentile
    const stats = this.props.voterInfo.stats
    const ageGroup = this.props.voterInfo.ageGroup
    const ageGroupPercentile = (percentile) ? percentile[0] : this.getPercentile(stats[ageGroup]);
    const overallPercentile = (percentile) ? percentile[1] : this.getPercentile(this.getOverallPercentile(stats));
    if (!percentile && isNaN(ageGroupPercentile) === false) {
      this.props.addPercentileCallback([ageGroupPercentile, overallPercentile])
    }
    // uncomment this to redirect if user not logged in
    if (!this.props.loggedIn) {
      this.props.addErrorMessageCallback('We need to lookup your voter information to show this page.', 'warning')
      this.props.history.push('/Login')
    }

    const voteRecord = `You voted in ${this.props.votingHistory.length} of the last ${this.props.voterInfo.maxElections} elections.`
    return (
      <div>

        <h1 className='title'>Your Voting Statistics</h1>

        <p className='text'>{voteRecord}</p>
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

          <PieGraph
            // data={data}
            stats={this.props.voterInfo.stats}
            ageGroup={ageGroup}
            ageGroups={AgeGroups}
            city={this.props.city} />
          <InfoCard
            percentile={ageGroupPercentile}
            group={ageGroup}
            city={this.props.city}
          />
          <InfoCard
            percentile={overallPercentile}
            city={this.props.city} />
          <BarGraph
            data={this.props.voterInfo.stats}
            maxVotes={this.props.voterInfo.maxElections}
            loggedIn={this.props.loggedIn}
            maxElections={this.props.maxElections}
            city={this.props.city} />

        </div>
      </div >
    )
  }
}

export default withRouter(Stats);