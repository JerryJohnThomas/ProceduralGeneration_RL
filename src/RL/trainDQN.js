// src/trainDQN.js
import * as tf from '@tensorflow/tfjs';
import { createDQNModel } from './DQNModel';

export async function trainDQN() {
  const model = createDQNModel();
  model.compile({
    optimizer: tf.train.adam(),
    loss: 'meanSquaredError'
  });

  const BATCH_SIZE = 32;
  const numBatches = 1000;

  for (let i = 0; i < numBatches; i++) {
    console.log(i);
    const xs = tf.randomNormal([BATCH_SIZE, 84, 84, 3]);
    const ys = tf.randomUniform([BATCH_SIZE, 2]);

    await model.fit(xs, ys, {
      batchSize: BATCH_SIZE,
      epochs: 1
    });

    tf.dispose([xs, ys]);

    console.log(`Batch ${i + 1}/${numBatches} complete`);
  }

  console.log('Training complete');
}
