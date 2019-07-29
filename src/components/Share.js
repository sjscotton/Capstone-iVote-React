import React, { Component } from 'react';
import domtoimage from 'dom-to-image';
import './Share.css'

import logo from '../images/ivote.png';

class Share extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
    }
  }



  componentDidMount() {
    this.props.setCurrPageCallback('')
    const that = this;
    setTimeout(function () {
      let node = document.getElementById('photo');
      // Most of this function is taken from the domtoimage documentation 
      // https://ourcodeworld.com/articles/read/38/how-to-capture-an-image-from-a-dom-element-with-javascript
      domtoimage.toPng(node).then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl
        that.setState({ image: dataUrl })
      }).catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
    }, 1000)
  }

  generateVotingBoxes(votingDates) {
    return Array(this.props.maxElections).fill().map((none, i) => {
      const style = this.props.numVotes > i ? "img-vote" : "img-no-vote";
      const img = this.props.numVotes > i ? "https://i.imgur.com/EYwhsdg.png" : "https://i.imgur.com/GERvwBT.png";
      return (

        <img key={i} src={img} alt="vote sticker" className={`img-sticker ${style}`} />

      )
    })
  }

  generateImageArea() {
    const percentileMessage = (this.props.percentile) ? this.getPercentileMessage() : '';
    let name = (this.props.firstName) ? this.props.firstName.toLowerCase() : '';
    if (name) {
      name = name[0].toUpperCase() + name.slice(1)
    }
    const voteRecord = `${name} voted in ${this.props.numVotes} of the last ${this.props.maxElections} elections,`
    return (
      <div id='photo' className='photo-container'>
        <div className='flex-container'>
          <img className='logo share-logo' src={logo} alt='logo' />
        </div>
        <div className='sticker-img-box flex-container'>
          {this.generateVotingBoxes()}
        </div>
        <h2 className='photo-text'>{voteRecord}</h2>
        <h2 className='photo-text'>{percentileMessage}</h2>
        <h2 className='photo-text'>Do you vote?</h2>

      </div>
    )
  }
  generateImage() {
    return (
      <img src={this.state.image} alt="Voting streak" />
    )
  }

  getOrdinal(percentile) {
    let ordinalInd = 'th'
    if (percentile % 10 === 1) {
      ordinalInd = 'st'
    } else if (percentile % 10 === 2) {
      ordinalInd = 'nd'
    } else if (percentile % 10 === 3) {
      ordinalInd = 'rd'
    }
    return ordinalInd
  }
  getPercentileMessage() {
    let message = ''
    if (this.props.percentile[0] > this.props.percentile[1]) {
      message = `and is in the ${this.props.percentile[0]}${this.getOrdinal()} percentile of voters ages ${this.props.ageGroup} in ${this.props.city}`
    } else {
      message = `and is in the ${this.props.percentile[1]}${this.getOrdinal()} percentile of voters in ${this.props.city}`
    }

    return message
  }
  render() {


    const stickers = (this.state.image) ? this.generateImage() : this.generateImageArea();
    const msg = (this.state.image) ? 'Share this image to whichever media platform you prefer.' : '';
    return (
      <div>
        <div className="flex-container">
          <div className="photo-padding">
            {stickers}
          </div>
        </div >
        <div className="flex-container">
          <h4>{msg}</h4>
        </div >
      </div >
    )
  }

}

export default Share;