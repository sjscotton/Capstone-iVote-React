import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import './ErrorMessage.css'


const ErrorMessage = (props) => {
  let errorMessageStyle = props.errorStyle;
  let hidden = "hidden";
  if (props.message) {
    hidden = ''
  }

  return (
    <div className={`${hidden} flex-container ${errorMessageStyle}`}>

      <div className='error-box flex-container'>
        <div className='error-btn'>
          <Button
            variant="contained"
            onClick={() => { props.addErrorMessageCallback('') }}
          >
            X
        </Button>
        </div>
        <div className='error-message'>
          {props.message}
        </div>
      </div>

    </div >
  )
}

export default ErrorMessage;