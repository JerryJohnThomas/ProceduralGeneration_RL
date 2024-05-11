import React, { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Plane, PerspectiveCamera } from "@react-three/drei";
import { FloorWithSquares, Floor, Light_Common, FloorUgly, Platform, CheckerPlatform } from "./Components/Floor";
import PlatformAdder from "./Components/PlatformAdder";
import { useWorldEnv } from "../contexts/WorldEnv";

function Env1() {
    const { startingPosition, target, platforms, setStartingPosition, setTarget, setPlatforms, addPlatform } = useWorldEnv();
    let handleButtonClick = () => {};
    const controls = useRef();

    let AddPlatformWrapper = (whoCalled) => {
        console.log(whoCalled);
        let delta = 0.01;
        // Generate random position within a range
        const range = 20;
        const randomX = Math.random() * range - range / 2;
        const randomY = Math.random() * range/4 - range / 8;
        const randomZ = Math.random() * range - range / 2;
        const randomPosition = [randomX + delta, randomY + delta, randomZ + delta];
        addPlatform(randomPosition);
    };
    const handleKeyDown = (event) => {
        console.log(event);
        if (event.key === "p" || event.key === "P") {
            AddPlatformWrapper("key");
        }
    };

    const handleMouseDown = (event) => {
        if (event.button === 0) {
            AddPlatformWrapper("mouse");
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleMouseDown);
    }, []);

    return (
        <Canvas style={{ height: "100vh" }}>
            <PerspectiveCamera makeDefault position={[0, 7, 13]} />
            <Suspense fallback={null}>
                <Light_Common />
                <FloorWithSquares />
                <CheckerPlatform position={target.position} />
                {platforms.map((platform) => {
                    return <Platform key={platform.id} color={platform.color} size={[3, 0.5, 3]} position={platform.position} />;
                })}
                <OrbitControls ref={controls} />
                <directionalLight intensity={0.9} position={[5, 10, 5]} />
                <directionalLight intensity={0.9} position={[-5, 10, -5]} />
                {/* <PlatformAdder mouse={true} keys={true} /> */}
            </Suspense>
        </Canvas>
    );
}

export default Env1;
