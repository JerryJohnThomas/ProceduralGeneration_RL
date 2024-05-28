import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Page404 from "./pages/Page404";
import Home from "./pages/Home";
import Env1 from "./Game/Env1";
import World from "./Game/World";
import Player from "./Player/Player";
import RayCastermini from "./Player/RayCastermini";
import Env2_wrapper from "./Game/Env2_wrapper";
import DQNLanding from "./RL/DQNLanding";

function App() {
    return (
        <Router>
            <Routes>
                {/* <Route path="/" element={<World />} /> */}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/world" element={<World />} />
                <Route path="/env" element={<Env1 />} />
                <Route path="/env2" element={<Env2_wrapper />} />
                <Route path="/dqn" element={<DQNLanding />} />
                <Route path="/player" element={<Player />} />
                <Route path="/raycaster" element={<RayCastermini />} />
                <Route path="/ProceduralGeneration_RL" element={<Home />} />
                {/* <Route path="/ProceduralGeneration_RL" element={<Home />} /> */}
                <Route path="/*" element={<Page404 />} />
            </Routes>
        </Router>
    );
}

export default App;
