import React from 'react';

const Clock = () => {
  function getTime() {
    return new Date().toLocaleTimeString();
  }

  return <div>{getTime()}</div>;
};

export default Clock;
