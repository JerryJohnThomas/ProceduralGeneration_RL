import React from "react";
import { OrbitControls, Plane, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Guy from "./Guy";
import Woman from "./Woman";
import { Light_Common } from "../Game/Components/Floor";

function Box() {
    const size = 1 ;
    return (
        <mesh>
            <boxGeometry args={[size, size, size]} /> {/* Specify the width, height, and depth */}
            <meshStandardMaterial color="blue" /> {/* Set the color of the material */}
        </mesh>
    );
}

function Player() {
    return (
        <>
            <Canvas style={{ height: "100vh" }}>
                <OrbitControls />
                <Guy />
                {/* <Woman /> */}
                {/* <Box /> */}
                <Light_Common />
                <pointLight position={[10, 10, 10]} />
            </Canvas>
        </>
    );
}

export default Player;
