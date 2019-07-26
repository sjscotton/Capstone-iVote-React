import React, { Component } from 'react';
import domtoimage from 'dom-to-image';
import './Share.css'


class Share extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
    }
  }

  componentDidMount() {

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

        <img src={img} alt="vote sticker" className={`img-sticker ${style}`} />

      )
    })
  }

  generateImageArea() {
    return (
      <div id='photo' className='photo-container'>
        <h1>Do I Vote</h1>
        <div className='sticker-img-box'>
          {this.generateVotingBoxes()}
        </div>

      </div>
    )
  }
  generateImage() {
    console.log(this.state.image)
    return (
      <img src={this.state.image} alt="Voting streak" />
    )
  }
  render() {
    const stickers = (this.state.image) ? this.generateImage() : this.generateImageArea();
    const msg = (this.state.image) ? 'Share this image to whichever media platform you prefer.' : '';
    return (
      <div className="vertical-flex flex-container">
        <div className="photo-padding">
          {stickers}
        </div>
        <h4>{msg}</h4>
      </div >



      // <div>
      //   <div className='photo-container'>
      //     {/* <h1>Do I Vote</h1> */}
      //     <div id='photo' className='sticker-img-box'>
      //       {stickers}
      //     </div>

      //   </div>
      //   <h4>{msg}</h4>
      // </div >
    )
  }

}

export default Share;