import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Page404 from "./pages/Page404";
import Home from "./pages/Home";
import World from "./Game/World";
import Player from "./Player/Player";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<World />} />
                <Route path="/home" element={<Home />} />
                <Route path="/world" element={<World />} />
                <Route path="/player" element={<Player />} />
                <Route path="/ProceduralGeneration_RL" element={<Home />} />
                {/* <Route path="/*" element={<Page404 />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
