import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Page404 from "./pages/Page404";
import Home from "./pages/Home";
import World from "./Game/World";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<World />} />
                <Route path="/home" element={<Home />} />
                <Route path="/world" element={<World />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </Router>
    );
}

export default App;
