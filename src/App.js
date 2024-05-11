import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Page404 from "./pages/Page404";
import Home from "./pages/Home";
import Env1 from "./Game/Env1";
import World from "./Game/World";
import Player from "./Player/Player";
import RayCastermini from "./Player/RayCastermini";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<World />} />
                <Route path="/home" element={<Home />} />
                <Route path="/world" element={<World />} />
                <Route path="/env" element={<Env1 />} />
                <Route path="/player" element={<Player />} />
                <Route path="/raycaster" element={<RayCastermini />} />
                <Route path="/ProceduralGeneration_RL" element={<Player />} />
                {/* <Route path="/ProceduralGeneration_RL" element={<Home />} /> */}
                {/* <Route path="/*" element={<Page404 />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
