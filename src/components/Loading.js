import React, { Component } from 'react';
import Spinner from 'react-spinner-material';



function Loading(props) {
  const msgOne = (props.firstName) ? `We found you, Hello ${props.firstName}!` : 'Please wait as we look you up, it may take a minute.';
  const msgTwo = (props.firstName) ? 'Loading your voting history....' : 'Loading voter data....';
  return (
    <div>
      <h3>{msgOne}</h3>
      <h3>{msgTwo}</h3>
      <div className='spinner-flex'><Spinner size={100} spinnerColor={"#2c8396"} spinnerWidth={10} visible={true} /></div>


    </div>
  );
}

export default Loading;