import React from "react";
import { trainDQN } from "./trainDQN";
import { useState } from "react";
import { useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { Network } from "./Network";
import DQNAgent from "./DQNAgent";

function DQNLanding() {
    const [output, setOutput] = useState(null);

    async function predictOutput() {
        const in_dim = 10; // Example input dimension
        const out_dim = 5; // Example output dimension

        const network = new Network(in_dim, out_dim);

        const input = tf.tensor2d([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]);
        console.log("input", input.arraySync());

        const result = await network.forward(input);
        setOutput(result.arraySync());
        console.log("result", result.arraySync());
        init();
    }

    let init = () => {
        let seed= 72;
        let num_frames = 10000;
        let memory_size = 1000;
        let batch_size = 32;
        let target_update = 100;
        let epsilon_decay = 1 / 2000;

        let agent = new DQNAgent(null, memory_size, batch_size, target_update, epsilon_decay, seed);
        console.log(agent);
    };

    return (
        <div className="DQNLanding">
            <h1>DQN Training with TensorFlow.js</h1>
            <button onClick={predictOutput}>Start Training</button>
            <div>
                <h2>Output:</h2>
                {output && (
                    <ul>
                        {output.map((value, index) => (
                            <li key={index}>{value}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default DQNLanding;
