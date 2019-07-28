import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import './ErrorMessage.css'


const ErrorMessage = (props) => {
  let errorMessageStyle = props.errorStyle;
  let hidden = "hidden";
  if (props.message) {
    hidden = ''
  }
  // console.log(props.addErrorMessageCallback)
  return (
    <div className={`${hidden} flex-container ${errorMessageStyle}`}>

      <div className='error-box flex-container'>
        <div className='error-btn'>
          <Button
            variant="contained"
            // variant="outlined"
            onClick={() => { props.addErrorMessageCallback('') }}

          >
            X
        </Button>
        </div>
        {/* <button onClick={() => { props.addErrorMessageCallback('') }} className="close" >close</button> */}
        <div className='error-message'>
          {props.message}
        </div>
      </div>

    </div >
  )
}

export default ErrorMessage;