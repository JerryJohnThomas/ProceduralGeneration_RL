import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Plane , PerspectiveCamera } from "@react-three/drei";
import { FloorWithSquares, Floor, Light_Common, FloorUgly, Platform,  CheckerPlatform } from "./Components/Floor";
import { DirectionalLight } from '@react-three/drei';

function World() {
    const controls = useRef();
    return (
        <Canvas style={{ height: "100vh" }}>
            <PerspectiveCamera makeDefault position={[0, 7, 13]} />
            <Suspense fallback={null}>
                <Light_Common />
                {/* <FloorUgly /> */}
                {/* <Floor /> */}
                <FloorWithSquares position={[3, -0.75, -3]} />
                <CheckerPlatform />
                {/* <Platform position={[3, -0.75, -3]} color="#ffee00" />  */}
                {/* <Platform position={[3, 3,0]} color="#ffee00" />  */}
                <Platform color="#ff0000" size={[3, 0.5, 3]} position={[0, -1, 0]} />
                <OrbitControls ref={controls} />
                <directionalLight intensity={0.9} position={[5, 10, 5]} />
                <directionalLight intensity={0.9} position={[-5, 10, -5]} />
            </Suspense>
        </Canvas>
    );
}

export default World;
