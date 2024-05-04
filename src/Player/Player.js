import React from "react";
import { OrbitControls, Plane, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Guy from "./Guy";
import Woman from "./Woman";
import { Light_Common } from "../Game/Components/Floor";

function Box() {
    const size = 0.3;
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
            <Canvas style={{ height: "100vh" }} camera={{ position: [1, 1.5, 2.5], fov: 50 }} shadows>
                <OrbitControls />
                <group position={[0,-1,0]}>
                    <Guy />
                    {/* <Woman /> */}
                </group>
                {/* <Box /> */}
                {/* <Light_Common /> */}
                {/* <pointLight position={[-1, 1, 1]} intensity={5} castShadow /> */}
                <directionalLight castShadow position={[-1, 1, 1]} intensity={5} />
            </Canvas>
        </>
    );
}

export default Player;
