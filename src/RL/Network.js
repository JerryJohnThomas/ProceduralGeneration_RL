import * as tf from '@tensorflow/tfjs';

export class Network {
  constructor(in_dim, out_dim) {
    // Define the layers of the network
    this.model = tf.sequential();

    // Add layers to the model
    this.model.add(tf.layers.dense({
      units: 128,
      inputShape: [in_dim],
      activation: 'relu'
    }));

    this.model.add(tf.layers.dense({
      units: 128,
      activation: 'relu'
    }));

    this.model.add(tf.layers.dense({
      units: out_dim
    }));
  }

  // Define the forward pass
  forward(x) {
    // Perform forward pass through the model
    return this.model.predict(x);
  }
}
