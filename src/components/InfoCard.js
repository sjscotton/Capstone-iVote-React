import React, { Component } from 'react';
import { GetOrdinal } from '../helpers'
import './InfoCard.css'

class InfoCard extends Component {

  render() {
    const percentile = (isNaN(this.props.percentile)) ? 0 : this.props.percentile;
    const ordinalInd = GetOrdinal(percentile)
    const ageMsg = (this.props.group) ? `ages ${this.props.group}` : 'overall';
    return (
      <div className="graph ">
        <div className=" info-card">
          <p id='txt-1'>You are in the</p>
          <h1 id='txt-2'>{`${percentile}${ordinalInd}`}</h1>
          <p id='txt-3'>percentile of voters</p>
          <p id='txt-4'>{ageMsg}</p>
        </div>
      </div>
    )
  }
}


export default InfoCard;
