import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';

import './Graph.css'

const AgeGroups = ['18-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75-84', '85+']



class BarGraph extends Component {

  formatData() {
    const data = this.props.data;
    console.log("in Bar Graph", data)
    let formatedData = [];
    console.log("logged In", this.props.loggedIn)
    if (data['18-24']) {

      for (const ageGroup of AgeGroups) {
        console.log("ageGroup", ageGroup)
        const ageGroupData = { ageGroup: ageGroup, data: [] }
        for (let i = 0; i <= this.props.maxVotes; i += 1) {
          ageGroupData.data.push({ timesVoted: i, voters: data[ageGroup][i] })
        }
        formatedData.push(ageGroupData)
      }
    }
    console.log(formatedData)
    return formatedData
  }

  generateVictoryBars(voterData) {
    return voterData.map((stack, i) => {
      console.log("stack", stack)
      return (
        <VictoryBar
          alignment="start"
          key={i}
          barRatio={1}
          lable={stack.ageGroup}
          data={stack.data}
          x="timesVoted"
          y="voters"
        />
      )
    })
  }
  render() {
    const data = this.generateVictoryBars(this.formatData())
    console.log("victory bar data", data)

    return (

      <div>
        <h4>Graph Title</h4>
        <div className='graph'>
          <VictoryChart
            domainPadding={0}

            theme={VictoryTheme.material}
          >
            <VictoryAxis
              tickValues={[0, 1, 2, 3, 4, 5]}
              tickFormat={["0", "1", "2", "3", "4", "5"]}
            />
            <VictoryAxis
              dependentAxis
              label={'Percent of Voters'}
              tickFormat={(x) => (``)}
            // tickFormat={(x) => (`$${x / 1000}k`)}
            />
            <VictoryStack
              colorScale={"cool"}
            >{data}
              {/* <VictoryBar
                barRatio={1.2}
                data={data2012}
                x="quarter"
                y="earnings"
              />
              <VictoryBar
                barRatio={1.2}
                data={data2013}
                x="quarter"
                y="earnings"
              />
              <VictoryBar
                barRatio={1.2}
                data={data2014}
                x="quarter"
                y="earnings"
              />
              <VictoryBar
                barRatio={1.2}
                data={data2015}
                x="quarter"
                y="earnings"
              /> */}
            </VictoryStack>
          </VictoryChart>
        </div>

      </div>
    )
  }
}

export default BarGraph;