import React from "react";
import { OrbitControls, Plane, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Guy from "./Guy";

function Player() {
    return (
        <>
            <Canvas>
                <OrbitControls />
                <Guy />
            </Canvas>
        </>
    );
}

export default Player;
