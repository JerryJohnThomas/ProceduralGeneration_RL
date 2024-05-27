export class ReplayBuffer {
    constructor(obs_dim, size, batch_size = 32) {
      this.obs_buf = Array.from({ length: size }, () => new Array(obs_dim).fill(0));
      this.next_obs_buf = Array.from({ length: size }, () => new Array(obs_dim).fill(0));
      this.acts_buf = new Array(size).fill(0);
      this.rews_buf = new Array(size).fill(0);
      this.done_buf = new Array(size).fill(0);
      this.max_size = size;
      this.batch_size = batch_size;
      this.ptr = 0;
      this.size = 0;
    }
  
    store(obs, act, rew, next_obs, done) {
      this.obs_buf[this.ptr] = obs.slice();
      this.next_obs_buf[this.ptr] = next_obs.slice();
      this.acts_buf[this.ptr] = act;
      this.rews_buf[this.ptr] = rew;
      this.done_buf[this.ptr] = done;
      this.ptr = (this.ptr + 1) % this.max_size;
      this.size = Math.min(this.size + 1, this.max_size);
    }
  
    sample_batch() {
      const idxs = Array.from({ length: this.batch_size }, () => Math.floor(Math.random() * this.size));
      return {
        obs: idxs.map((idx) => this.obs_buf[idx]),
        next_obs: idxs.map((idx) => this.next_obs_buf[idx]),
        acts: idxs.map((idx) => this.acts_buf[idx]),
        rews: idxs.map((idx) => this.rews_buf[idx]),
        done: idxs.map((idx) => this.done_buf[idx]),
      };
    }
  
    length() {
      return this.size;
    }
  }