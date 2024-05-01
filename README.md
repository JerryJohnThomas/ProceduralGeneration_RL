# Procedural Content Generation using Adversarial Reinforcement Learning 


## Aim
* Try to replicate similar results gotten from unity and unity ML API on platformer game using our very own js from scratch using three.js for game environment and tf.js for RL tasks
* Im very sceptical about tf.js and how much of RL can be done, similarly in React im not sure if state changes causes re-renders and resets issue, hopefully some progress can be made.
* Paper - [here](https://arxiv.org/abs/2103.04847)
* This is from EA - SEED team (R&D ML) from 2021
* Video demo - [here](https://www.youtube.com/watch?v=kNj0qcc6Fpg)


## Why Am i doing this
* I'm a mad, passionate coder 

## Steps

### Game Environment

World
1. Create a World
2. Create a starting and ending point
3. create dynamic slab inserts

Agent
1. Create a Player 
2. Add physics
3. Add jump 
4. add controls
5. add ray cast

### RL
1. write ppo using tf.js 
2. write reward mechanisms
3. add environment stuff
4. add agent stuff
5. Adversarial frame work

### Training
1. Run single player for 10k steps **and pray** (the most crucial step in RL)



