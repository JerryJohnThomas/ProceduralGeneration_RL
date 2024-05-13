import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import World from "../Game/World";
import { FaLinkedin } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaMedium } from "react-icons/fa6";
function Home() {

    return (
        <div className="homeContainer">
            <div className="page1">
                <div className="homeTitle">Procedural Generation via Adversarial RL</div>

                <div className="introPara">
                    This is a Paper by Seed (R&D of EA sports), where they attempt to make a platformer game where the Platform generator and the
                    Player Solver works together to reach the end platfrom from the starting Platform
                    <br />
                    <br />
                    Here both the platformer generator and the player are Reinforcement Learning Agents, where they have their rewards intertwined.
                </div>
                <div className="worldHomeDemo">
                    <World orbitalControllable={true} initialcampov={[10, 5, 13]} />
                </div>
            </div>

            <div className="page1">
                <div className="subtitle">Follow Along the Journey here</div>
                <div className="episode_container">
                    <div className="episode_title">Episode 1</div>
                    <div className="episode_description">
                        We explore on how to create a world in three js with just the platform, you can read more about it{" "}
                        <a
                            href="https://medium.com/@jerryjohnthomas/procedural-generation-via-adversarial-rl-using-javascript-ep02-player-8e5afcde1b94?source=user_profile---------1----------------------------"
                            target="_blank"
                        >
                            here
                        </a>
                        <span /> and experience the <Link to="/world"> demo</Link> here
                    </div>
                </div>
                <div className="episode_container">
                    <div className="episode_title">Episode 2</div>
                    <div className="episode_description">
                        We explore on how to create the player in three js with basic movements, physics, animations and controls. Starting from
                        scratch and having it in your World. You can read more about it{" "}
                        <a
                            href="https://medium.com/@jerryjohnthomas/procedural-generation-via-adversarial-rl-using-javascript-ep02-player-8e5afcde1b94"
                            target="_blank"
                        >
                            here
                        </a>
                        <span /> and experience the <Link to="/player"> demo</Link> here
                    </div>
                </div>
                <div className="episode_container">
                    <div className="episode_title">Episode 3</div>
                    <div className="episode_description">
                        Coming Soon, we will explore what are the different RL methods we can start with in js, refactor code to mimic an gym
                        environment used in RL experiments and more. Building demo <Link to="/env"> here</Link>
                    </div>
                </div>
                <div className="subtitle">References</div>
                <div className="episode_description">
                    Official Demo of the Paper - <span />
                    <a href="https://www.youtube.com/watch?v=kNj0qcc6Fpg" target="_blank">
                        here
                    </a>
                </div>

                <div className="episode_description connect">
                    Connect with me - <span />
                    <a href="https://linkedin.com/in/jerry-john-thomas" target="_blank">
                    <FaLinkedin className="bitDown"/> 
                    </a>
                    <span /> <span />
                    <a href="https://medium.com/@jerryjohnthomas" target="_blank">
                        <FaMedium />
                    </a>
                    

                </div>
            </div>
        </div>
    );
}

export default Home;
