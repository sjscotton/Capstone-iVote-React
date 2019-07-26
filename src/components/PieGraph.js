import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VictoryPie, VictoryLabel, VictoryTooltip } from 'victory';

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
  render() {
    return (
      <div className="graph">
        <h3>Number of times people your age voted in your City</h3>
        <VictoryPie
          colorScale={['#00125c', '#570d68', '#910468', '#c21c60', '#e64450', '#fe723c', '#ffa227', '#ffd321']}
          style={{ labels: { fill: "white", fontSize: 24 } }}
          innerRadius={0}
          labelRadius={110}
          labels={(d) => d.y}
          labelComponent={<CustomLabel />}
          data={this.props.data}
        />
      </div>
    );
  }
}



export default PieGraph;