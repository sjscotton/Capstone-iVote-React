import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VictoryPie, VictoryLabel, VictoryTooltip } from 'victory';
import { Capitalize } from '../helpers'

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import './Graph.css'

class CustomLabel extends Component {

  render() {

    const percent = this.props.data[this.props.index].percent
    const plural = (this.props.text === '1') ? '' : 's';
    return (
      <g>
        <VictoryLabel {...this.props} />
        <VictoryTooltip
          {...this.props}
          x={200} y={275}
          text={`${percent}% voted\n${this.props.text} time${plural}`}
          orientation="top"
          pointerLength={0}
          cornerRadius={75}
          width={150}
          height={150}
          flyoutStyle={{ fill: "#00125c" }}
        />
      </g>
    );
  }
}
CustomLabel.defaultEvents = VictoryTooltip.defaultEvents;
CustomLabel.propTypes = { text: PropTypes.string };

class PieGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ageGroup: this.props.ageGroup
    }
  }

  pieGraphVotingData(ageGroup) {
    const data = this.props.stats[ageGroup]
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

  generateSelectFields() {
    return this.props.ageGroups.map((ageGroup, i) => {
      return (
        <MenuItem key={i} value={ageGroup}>{ageGroup}</MenuItem>
      )
    })
  }

  handleChange = (event) => {
    this.setState({ ageGroup: event.target.value })
  }
  render() {
    const data = this.pieGraphVotingData(this.state.ageGroup)

    return (
      <div className="graph">
        <h3>Number of times people ages
        <FormControl className=''>
            <Select
              value=""
              onChange={this.handleChange}
              displayEmpty
              name="age"
              className=''
            >
              <MenuItem value="">
                <em>{this.state.ageGroup}</em>
              </MenuItem>
              {this.generateSelectFields()}
            </Select>
          </FormControl>
          voted in {Capitalize(this.props.city)}</h3>
        <VictoryPie
          colorScale={['#00125c', '#570d68', '#910468', '#c21c60', '#e64450', '#fe723c', '#ffa227', '#ffd321']}
          style={{ labels: { fill: "white", fontSize: 24 } }}
          innerRadius={0}
          labelRadius={110}
          labels={(d) => d.y}
          labelComponent={<CustomLabel />}
          data={data}
        />
      </div>
    );
  }
}



export default PieGraph;