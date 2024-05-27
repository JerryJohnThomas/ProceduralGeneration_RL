import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Plane, PerspectiveCamera } from "@react-three/drei";
import { FloorWithSquares, Floor, Light_Common, FloorUgly, Platform, CheckerPlatform } from "./Components/Floor";
import PlatformAdder from "./Components/PlatformAdder";
import { useWorldEnv } from "../contexts/WorldEnv";
import { Physics, RigidBody } from "@react-three/rapier";
import { useInterfaceButton } from "../contexts/InterfaceButton";
import Guy from "../Player/Guy";
import GuyGym from "../Player/GuyGym";
import { usePlayer } from "../contexts/PlayerContext";
import { Actions } from "../Class/Actions";

function Env1() {
    const { target, platforms, setTarget, setPlatforms, addPlatform } = useWorldEnv();
    const {} = usePlayer();
    const { agents, moveAgent, getPosition, getRotation, resetAgent, addAgent } = usePlayer();

    const { isButtonDebugToggledState } = useInterfaceButton();
    let currentAgent = useRef(0);
    let handleButtonClick = () => {};
    const controls = useRef();

    let AddPlatformWrapper = (whoCalled) => {
        // console.log(whoCalled);
        let delta = 0.01;
        // Generate random position within a range
        const range = 20;
        const randomX = Math.random() * range - range / 2;
        const randomY = (Math.random() * range) / 4 - range / 8;
        const randomZ = Math.random() * range - range / 2;
        const randomPosition = [randomX + delta, randomY + delta, randomZ + delta];
        addPlatform(randomPosition);
    };

    const handleKeyDown = (event) => {
        if (event.key === "p" || event.key === "P") {
            AddPlatformWrapper("key");
        }
        switch (event.key) {
            case "ArrowUp":
            case "w":
                moveAgent(currentAgent.current, Actions.FORWARD);
                break;
            case "ArrowDown":
            case "s":
                moveAgent(currentAgent.current, Actions.BACKWARD);
                break;
        }
        switch (event.key) {
            case "ArrowLeft":
            case "a":
                moveAgent(currentAgent.current, Actions.LEFT);
                break;
            case "ArrowRight":
            case "d":
                moveAgent(currentAgent.current, Actions.RIGHT);
                break;
        }
        switch (event.key) {
            case " ":
                moveAgent(currentAgent.current, Actions.JUMP);
                break;
            case "y":
                addAgent();
                break;
            case "j":
                currentAgent.current = (currentAgent.current+1)%2;
                break;
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
            <Suspense fallback={null}>
                <Physics debug={isButtonDebugToggledState}>
                    <PerspectiveCamera makeDefault position={[0, 7, 13]} />
                    <Light_Common />
                    {agents.map((agent, id) => {
                        return (
                            <GuyGym
                                agentId={agent.agentId.current}
                                key={agent.agentId.current}
                                rb={agent.rb}
                                isButtonUpPressedRef={agent.isButtonUpPressedRef}
                                isButtonDownPressedRef={agent.isButtonDownPressedRef}
                                isButtonLeftPressedRef={agent.isButtonLeftPressedRef}
                                isButtonRightPressedRef={agent.isButtonRightPressedRef}
                                isButtonJumpPressedRef={agent.isButtonJumpPressedRef}
                                startingPos={agent.startingPos}
                                moveAgent={moveAgent}
                                addAgent={addAgent}
                                groupRef={agent.groupRef}
                                currentAgent={currentAgent}
                            />
                        );
                    })}

                    <FloorWithSquares />
                    <RigidBody type="fixed" name="floor" colliders="hull">
                        <CheckerPlatform position={target.position} />
                        {platforms.map((platform) => {
                            return <Platform key={platform.id} color={platform.color} size={platform.size} position={platform.position} />;
                        })}
                    </RigidBody>
                    <OrbitControls ref={controls} />
                    <directionalLight intensity={0.9} position={[5, 10, 5]} />
                    <directionalLight intensity={0.9} position={[-5, 10, -5]} />
                </Physics>
            </Suspense>
        </Canvas>
    );
}

export default Env1;
