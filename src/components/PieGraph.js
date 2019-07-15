import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VictoryPie, VictoryLabel, VictoryTooltip } from 'victory';

// class PieGraph extends Component {
//   render() {
//     return (
//       <div className="graph">
//         <svg viewBox="0 0 400 400">
//           <VictoryPie
//             standalone={false}
//             width={400} height={400}
//             data={[
//               { x: 1, y: 120 }, { x: 2, y: 150 }, { x: 3, y: 75 }
//             ]}
//             innerRadius={68} labelRadius={100}
//             style={{ labels: { fontSize: 20, fill: "white" } }}
//           />
//           <VictoryLabel
//             textAnchor="middle"
//             style={{ fontSize: 20 }}
//             x={200} y={200}
//             text="Pie!"
//           />
//         </svg>
//       </div>
//     );
//   }
// }
class CustomLabel extends Component {

  render() {
    // const index = this.props.index
    // if (index == 0) {
    //   console.log(this.props)
    // }
    const percent = this.props.data[this.props.index].percent
    // console.log(percent)
    // const numVotes = this.props.datum.y
    // console.log("num votes", numVotes)
    const plural = (this.props.text === '1') ? '' : 's';
    return (
      <g>
        <VictoryLabel {...this.props} />
        <VictoryTooltip
          {...this.props}
          x={200} y={275}
          text={`%${percent} voted\n${this.props.text} time${plural}`}
          // style={{ labels: { fill: "#00125c", fontSize: 24 } }}
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
        <h4>Graph Title</h4>
        <VictoryPie
          colorScale={['#00125c', '#570d68', '#910468', '#c21c60', '#e64450', '#fe723c', '#ffa227', '#ffd321']}
          style={{ labels: { fill: "white", fontSize: 24 } }}
          innerRadius={0}
          labelRadius={110}
          labels={(d) => d.y}
          labelComponent={<CustomLabel />}
          data={this.props.data}
        // data={[
        //   { label: 1, y: 10, percent: 35 },
        //   { label: 2, y: 4, percent: 10 },
        //   { label: 3, y: 2, percent: 20 },
        //   { label: 4, y: 3, percent: 7 },
        //   { label: 5, y: 1, percent: 19 },
        //   { label: 6, y: 3, percent: 35 },
        //   { label: 7, y: 4, percent: 35 },
        //   { label: 8, y: 7, percent: 35 }
        // ]}
        />
      </div>
    );
  }
}



export default PieGraph;