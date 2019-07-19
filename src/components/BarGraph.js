import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryLabel, VictoryTooltip } from 'victory';
import PropTypes from 'prop-types';

import './Graph.css'

const AgeGroups = ['18-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75-84', '85+']



class BarGraph extends Component {

  formatData() {
    const data = this.props.data;
    // console.log("in Bar Graph", data)
    let formatedData = [];
    // console.log("logged In", this.props.loggedIn)
    if (data['18-24']) {

      for (const ageGroup of AgeGroups) {
        // console.log("ageGroup", ageGroup)
        const ageGroupData = { ageGroup: ageGroup, data: [] }
        for (let i = 0; i < data['18-24'].length; i += 1) {
          ageGroupData.data.push({ timesVoted: i, voters: data[ageGroup][i] })
        }
        formatedData.push(ageGroupData)
      }
    }
    // console.log("formated data", formatedData)
    return formatedData
  }

  generateVictoryBars(voterData) {
    return voterData.map((stack, i) => {
      // console.log("stack", stack)
      // console.log(stack.index)
      return (
        <VictoryBar
          // style={{ labels: { fontSize: 40 } }}
          labels={(d) => d.y}
          labelComponent={<CustomLabel />}
          alignment="start"
          key={i}
          barRatio={1}
          label={stack.ageGroup}
          data={stack.data}
          x="timesVoted"
          y="voters"
        />
      )
    })
  }
  render() {
    const data = this.generateVictoryBars(this.formatData())
    // console.log("victory bar data", data)
    console.log(this.props)
    return (



      <div className='graph'>
        <h3>Number of times people voted in your city by age group</h3>
        <VictoryChart
          domainPadding={0}

          theme={VictoryTheme.material}

        >
          <VictoryAxis
            tickValues={[0, 1, 2, 3, 4, 5]}
            tickFormat={["0", "1", "2", "3", "4", "5"]}
            label={`Times Voted in the last ${this.props.maxElections} elections`}
            style={{
              axis: { stroke: "#756f6a" },
              axisLabel: { fontSize: 20, padding: 30 },
            }}

          />
          <VictoryAxis
            dependentAxis
            label={'Percent of Voters'}
            style={{
              axis: { stroke: "#756f6a" },
              axisLabel: { fontSize: 20, padding: 30 },
              labels: { fontSize: 20 }
            }}
            tickFormat={(x) => (``)}

          />
          <VictoryStack
            colorScale={"cool"}
          >{data}

          </VictoryStack>
        </VictoryChart>
      </div>


    )
  }
}

class CustomLabel extends Component {

  render() {
    // console.log(this.props)
    // console.log(this.props.index)
    const text = AgeGroups[this.props.datum._stack - 1]
    // console.log("text", text)
    return (
      <g>
        <VictoryLabel {...this.props}
        />
        <VictoryTooltip
          {...this.props}
          x={300} y={100}
          text={`Ages ${text}`}
          orientation="top"
          pointerLength={0}
          cornerRadius={10}
          width={100}
          height={50}
          flyoutStyle={{ fill: "white", fontSize: 30, labels: { fontSize: 30 } }}
          style={{ labels: { fontSize: 30 } }}
        />
      </g>
    );
  }
}
CustomLabel.defaultEvents = VictoryTooltip.defaultEvents;
CustomLabel.propTypes = { text: PropTypes.string };


export default BarGraph;