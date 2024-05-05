import React from "react";
import { OrbitControls, Plane, PerspectiveCamera, KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Guy from "./Guy";
import Woman from "./Woman";
import { Floor, Light_Common, Platform } from "../Game/Components/Floor";
import { Physics, RigidBody } from "@react-three/rapier";
import { useMemo } from "react";

function Box() {
    const size = 0.3;
    return (
        <mesh>
            <boxGeometry args={[size, size, size]} /> {/* Specify the width, height, and depth */}
            <meshStandardMaterial color="blue" /> {/* Set the color of the material */}
        </mesh>
    );
}

export const Controls = {
    forward: "forward",
    back: "back",
    left: "left",
    right: "right",
    jump: "jump",
};

function Player() {
    const map = useMemo(
        () => [
            { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
            { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
            { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
            { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
            { name: Controls.jump, keys: ["Space"] },
        ],
        []
    );
    return (
        <>
            <KeyboardControls map={map}>
                <Canvas style={{ height: "100vh" }} camera={{ position: [3, 4.5, 7.5], fov: 50 }} shadows>
                    <Physics debug>
                        <OrbitControls />
                        <Guy />
                        <RigidBody type="fixed" name="floor" colliders="hull">
                            <Platform color="#0D5D56" size={[5, "x", 5]} position={[2, -1.25, 0]} />
                        </RigidBody>
                        <directionalLight castShadow position={[-1, 1, 1]} intensity={5} />
                    </Physics>
                </Canvas>
            </KeyboardControls>
        </>
    );
}

export default Player;
