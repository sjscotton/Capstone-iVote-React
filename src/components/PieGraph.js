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
    return (
      <g>
        <VictoryLabel {...this.props} />
        <VictoryTooltip
          {...this.props}
          x={200} y={250}
          text={`# ${this.props.text}`}
          orientation="top"
          pointerLength={0}
          cornerRadius={50}
          width={100}
          height={100}
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
          innerRadius={80}
          labelRadius={120}
          labels={(d) => d.y}
          labelComponent={<CustomLabel />}
          data={[
            { x: 1, y: '18-24' },
            { x: 2, y: 4 },
            { x: 3, y: 2 },
            { x: 4, y: 3 },
            { x: 5, y: 1 },
            { x: 6, y: 3 },
            { x: 7, y: 4 },
            { x: 8, y: 7 }
          ]}
        />
      </div>
    );
  }
}



export default PieGraph;