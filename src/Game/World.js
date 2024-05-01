import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Plane, PerspectiveCamera } from "@react-three/drei";
import { FloorWithSquares, Floor, Light_Common, FloorUgly, Platform, CheckerPlatform } from "./Components/Floor";
import { DirectionalLight } from "@react-three/drei";
import ClickToAddPlatform from "./Components/ClickToAddPlatform";
import PlatformAdder from "./Components/PlatformAdder";

function World() {
    let handleButtonClick = () => {};
    const controls = useRef();
    return (
            <Canvas style={{ height: "100vh" }}>
                <PerspectiveCamera makeDefault position={[0, 7, 13]} />
                <Suspense fallback={null}>
                    <Light_Common />
                    {/* <ClickToAddPlatform /> */}
                    {/* <FloorUgly /> */}
                    {/* <Floor /> */}
                    <FloorWithSquares />
                    <CheckerPlatform position={[-1, 3.2, 1]} />
                    <Platform color="#ff0000" size={[3, 0.5, 3]} position={[3, 0, 1]} />
                    <OrbitControls ref={controls} />
                    <directionalLight intensity={0.9} position={[5, 10, 5]} />
                    <directionalLight intensity={0.9} position={[-5, 10, -5]} />
                    <PlatformAdder mouse={true} keys={true} />
                </Suspense>
            </Canvas>
    );
}

export default World;
