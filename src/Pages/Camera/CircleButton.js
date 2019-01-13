import React from 'react';

import './CircleButton.css';

export const CircleButton = ({ onClick }) => {
  return (
    <div id="container-circles">
      <div id="outer-circle" onClick={() => onClick()}>
        <div id="inner-circle">
        </div>
      </div>
    </div>
  );
};

export default CircleButton;