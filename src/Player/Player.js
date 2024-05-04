import React from "react";
import { OrbitControls, Plane, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Guy from "./Guy";
import Woman from "./Woman";
import { Floor, Light_Common, Platform } from "../Game/Components/Floor";
import { Physics, RigidBody } from "@react-three/rapier";

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
            <Canvas style={{ height: "100vh" }} camera={{ position: [3, 4.5, 7.5], fov: 50 }} shadows>
                <Physics>
                    <OrbitControls />
                    {/* our Guy is a Rigid Body */}
                        {/* <group position={[0, 3, 0]}> */}
                            <Guy />
                        {/* </group> */}
                    {/* the Floor is a fixed rigid body i.e does not move */}
                    <RigidBody type="fixed">
                        {/* <Platform color="#0D5D56" size={[30, "x", 30]} position={[0, -1.25, 0]} /> */}
                        <Platform color="#0D5D56" size={[5, "x", 5]} position={[2, -1.25, 0]} />
                    </RigidBody>
                    <directionalLight castShadow position={[-1, 1, 1]} intensity={5} />
                </Physics>
            </Canvas>
        </>
    );
}

export default Player;
