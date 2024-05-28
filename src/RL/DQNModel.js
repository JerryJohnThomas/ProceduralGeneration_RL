// src/DQNModel.js
import * as tf from "@tensorflow/tfjs";

export function createDQNModel() {
    const model = tf.sequential();

    model.add(
        tf.layers.conv2d({
            inputShape: [84, 84, 3],
            filters: 16,
            kernelSize: 5,
            strides: 2,
            activation: "relu",
        })
    );

    model.add(tf.layers.batchNormalization());

    model.add(
        tf.layers.conv2d({
            filters: 32,
            kernelSize: 5,
            strides: 2,
            activation: "relu",
        })
    );

    model.add(tf.layers.batchNormalization());

    model.add(
        tf.layers.conv2d({
            filters: 32,
            kernelSize: 5,
            strides: 2,
            activation: "relu",
        })
    );

    model.add(tf.layers.batchNormalization());

    model.add(tf.layers.flatten());

    model.add(
        tf.layers.dense({
            units: 448,
            activation: "relu",
        })
    );

    model.add(
        tf.layers.dense({
            units: 2, // number of actions
        })
    );

    return model;
}
