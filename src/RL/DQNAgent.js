import * as tf from "@tensorflow/tfjs";
import { ReplayBuffer } from "./ReplayBuffer"; // Assuming you have the ReplayBuffer class
import { Network } from "./Network"; // Assuming you have the Network class
import { Actions } from "../Class/Actions";

export class DQNAgent {
    /**
     * DQN Agent interacting with the environment.
     *
     * @param {object} env - The environment object.
     * @param {number} memorySize - Length of memory.
     * @param {number} batchSize - Batch size for sampling.
     * @param {number} targetUpdate - Period for target model's hard update.
     * @param {number} epsilonDecay - Step size to decrease epsilon.
     * @param {number} seed - Random seed.
     * @param {number} maxEpsilon - Max value of epsilon.
     * @param {number} minEpsilon - Min value of epsilon.
     * @param {number} gamma - Discount factor.
     */
    constructor(env, memorySize, batchSize, targetUpdate, epsilonDecay, seed, maxEpsilon = 1.0, minEpsilon = 0.1, gamma = 0.99) {
        this.env = env;
        this.obsDim = env != null ? env.observationSpace.shape[0] : 3;
        this.actionDim = env != null ? env.actionSpace.n : 4;

        this.memory = new ReplayBuffer(this.obsDim, memorySize, batchSize);
        this.batchSize = batchSize;
        this.epsilon = maxEpsilon;
        this.epsilonDecay = epsilonDecay;
        this.seed = seed;
        this.maxEpsilon = maxEpsilon;
        this.minEpsilon = minEpsilon;
        this.targetUpdate = targetUpdate;
        this.gamma = gamma;

        // Initialize networks: dqn and dqn_target
        this.dqn = new Network(this.obsDim, this.actionDim);
        this.dqnTarget = new Network(this.obsDim, this.actionDim);

        // Copy dqn to dqnTarget
        this.dqnTarget.model.setWeights(this.dqn.model.getWeights());

        // Optimizer
        this.optimizer = tf.train.adam();

        // Transition to store in memory
        this.transition = [];

        // Mode: train / test
        this.isTest = false;

        console.log("Initialized DQNAgent");
    }

    selectAction(state) {
        // Select an action from the input state
        let selectedAction = null;
        // epsilon greedy policy
        if (this.epsilon > Math.random()) {
            selectedAction = this.env.action_space.sample();
        } else {
            const tensorState = tf.tensor2d([state]);
            const qValues = this.dqn.predict(tensorState);
            selectedAction = qValues.argMax().dataSync()[0];
            tensorState.dispose();
        }

        if (!this.isTest) {
            this.transition = [state, selectedAction];
        }
        return selectedAction;
    }

    step(action) {
        const [nextState, reward, terminated, truncated, _] = this.env.step(action);
        const done = terminated || truncated;

        if (!this.isTest) {
            this.transition.push(reward, nextState, done);
            this.memory.store(...this.transition);
        }

        return [nextState, reward, done];
    }



    updateModel() {
        const samples = this.memory.sampleBatch();

        const loss = this.computeDQNLoss(samples);

        this.optimizer.minimize(() => {
            return loss;
        });

        return loss.dataSync()[0];
    }
    train(numFrames, plottingInterval = 200) {
        this.isTest = false;

        const [state, _] = this.env.reset({ seed: this.seed });
        let updateCnt = 0;
        const epsilons = [];
        const losses = [];
        const scores = [];
        let score = 0;

        for (let frameIdx = 1; frameIdx <= numFrames; frameIdx++) {
            const action = this.selectAction(state);
            const [nextState, reward, done] = this.step(action);

            state = nextState;
            score += reward;

            // if episode ends
            if (done) {
                const [resetState, _] = this.env.reset({ seed: this.seed });
                state = resetState;
                scores.push(score);
                score = 0;
            }

            // if training is ready
            if (this.memory.length >= this.batchSize) {
                const loss = this.updateModel();
                losses.push(loss);
                updateCnt++;

                // linearly decrease epsilon
                this.epsilon = Math.max(this.minEpsilon, this.epsilon - (this.maxEpsilon - this.minEpsilon) * this.epsilonDecay);
                epsilons.push(this.epsilon);

                // if hard update is needed
                if (updateCnt % this.targetUpdate === 0) {
                    this._targetHardUpdate();
                }
            }

            // plotting
            // if (frameIdx % plottingInterval === 0) {
            //     this._plot(frameIdx, scores, losses, epsilons);
            // }
        }

        // this.env.close();
    }

    test(videoFolder) {
        this.isTest = true;

        // For recording a video
        // const naiveEnv = this.env;
        // this.env = gym.wrappers.RecordVideo(this.env, { videoFolder });

        const [state, _] = this.env.reset({ seed: this.seed });
        let done = false;
        let score = 0;

        while (!done) {
            const action = this.selectAction(state);
            const [nextState, reward, episodeDone] = this.step(action);

            state = nextState;
            score += reward;
            done = episodeDone;
        }

        console.log("Score:", score);
    }

    computeDQNLoss(samples) {
        const device = this.device; // for shortening the following lines
        const state = tf.tensor(samples.obs).toFloat().to(device);
        const nextState = tf.tensor(samples.next_obs).toFloat().to(device);
        const action = tf.tensor(samples.acts, [samples.acts.length, 1], "int32").to(device);
        const reward = tf.tensor(samples.rews, [samples.rews.length, 1]).toFloat().to(device);
        const done = tf.tensor(samples.done, [samples.done.length, 1]).toFloat().to(device);

        // G_t   = r + gamma * v(s_{t+1})  if state != Terminal
        //       = r                       otherwise
        const currQValue = this.dqn.predict(state).gather(action, 1);
        const nextQValue = this.dqnTarget.predict(nextState).max(1).expandDims(1).detach();
        const mask = tf.scalar(1).sub(done);
        const target = reward.add(tf.scalar(this.gamma).mul(nextQValue).mul(mask)).to(device);

        // calculate dqn loss
        const loss = tf.losses.huberLoss(currQValue, target);

        return loss;
    }

    targetHardUpdate() {
        this.dqnTarget.setWeights(this.dqn.getWeights());
    }
}

export default DQNAgent;
