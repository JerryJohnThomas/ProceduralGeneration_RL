import React from 'react';
import { trainDQN } from './trainDQN';

function DQNLanding() {
  return (
    <div className="DQNLanding">
      <h1>DQN Training with TensorFlow.js</h1>
      <button onClick={trainDQN}>Start Training</button>
    </div>
  );
}

export default DQNLanding;
