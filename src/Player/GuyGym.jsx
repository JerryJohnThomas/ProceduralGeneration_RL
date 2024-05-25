/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 .\\public\\Players\\Guy\\Guy.glb 
*/

import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useCharacterAnimations } from "../contexts/CharacterAnimations";
import { CapsuleCollider, RigidBody, euler, quat, vec3 } from "@react-three/rapier";
import { useFrame, useThree } from "@react-three/fiber";
import { Curve, Vector3 } from "three";
import { useKeyboardControls } from "@react-three/drei";
import { Controls } from "./Player";
import * as THREE from "three";
import { useInterfaceButton } from "../contexts/InterfaceButton";
import { usePlayer } from "../contexts/PlayerContext";
import InterfaceMovement from "./InterfaceMovement";
import { Actions } from "../Class/Actions";
const MOVEMENT_SPEED = 4.2;
const JUMP_FORCE = 10;
const ROTATION_SPEED = 5;
const vel = new Vector3();
let timer = 100;

const GuyGym = ({
    props,
    agentId,
    rb,
    isButtonUpPressedRef,
    isButtonDownPressedRef,
    isButtonLeftPressedRef,
    isButtonRightPressedRef,
    isButtonJumpPressedRef,
    startingPos,
    moveAgent,
    addAgent,
}) => {
    const { isButtonFreeRoamToggledRef, isButtonResetToggledRef } = useInterfaceButton();

    // const { rb, isButtonUpPressedRef, isButtonDownPressedRef, isButtonLeftPressedRef, isButtonRightPressedRef, isButtonJumpPressedRef, moveAgent } = usePlayer();
    const group = useRef();

    // useFrame(() => {
    //     if (timer <= 0) moveAgent(agentId, Actions.FORWARD);
    //     // else if (timer == 10)
    //     //     addAgent();
    //     else timer--;
    // });

    // const rb = useRef();
    const playerPos = useRef();
    const playerRot = useRef();
    const { nodes, materials, animations } = useGLTF(`${process.env.PUBLIC_URL}/Players/GuyJump.glb`);
    const { actions, names } = useAnimations(animations, group);
    const { setAnimations, animationIndex, setAnimationIndex } = useCharacterAnimations();
    const inTheAir = useRef(true);
    const landed = useRef(false);
    const { camera } = useThree();
    const playerRef = useRef();
    const offset = 10;
    const diethreshold = -10;
    // names
    // 'breathe'
    // 'dancingAnim'
    // 'jumpAnim1'
    // 'jumpAnim2'
    // 'jumpAnim3'
    // 'jumpingAnim'
    // 'runningAnim'

    let restartScene = () => {
        const position = vec3();
        position.x = startingPos.x;
        position.y = startingPos.y;
        position.z = startingPos.z;
        rb.current.setTranslation(position, true);
        isButtonResetToggledRef.current = false;
    };

    // animations
    useEffect(() => {
        setAnimations(names);
        restartScene();
    }, [names]);

    useEffect(() => {
        const animationAction = actions[names[animationIndex]];

        if (animationAction) {
            // Reset and fade in the animation
            // Set the loop mode based on the animation index
            animationAction.reset().fadeIn(0.5);

            if (animationIndex === 2) {
                animationAction.setLoop(THREE.LoopOnce, 1);
                animationAction.clampWhenFinished = true; // Pause at the last frame
            } else {
                animationAction.setLoop(THREE.LoopRepeat);
            }

            animationAction.play();

            return () => {
                animationAction.fadeOut(0.5);
            };
        }
    }, [animationIndex, actions, names]);

    useFrame(({ camera }) => {
        if (rb.current == null) return;
        const curVel = rb.current.linvel();
        vel.x = 0;
        vel.y = 0;
        vel.z = 0;

        const rotVel = {
            x: 0,
            y: 0,
            z: 0,
        };
        if (isButtonUpPressedRef.current) {
            vel.z -= MOVEMENT_SPEED;
        }
        if (isButtonDownPressedRef.current) {
            vel.z += MOVEMENT_SPEED;
        }
        if (isButtonLeftPressedRef.current) {
            rotVel.y += ROTATION_SPEED;
        }
        if (isButtonRightPressedRef.current) {
            rotVel.y -= ROTATION_SPEED;
        }

        // rb.current.setAngvel(angVel);
        rb.current.setAngvel(rotVel);

        // apply rotation to x and z to go in the right direction
        const eulerRot = euler().setFromQuaternion(quat(rb.current.rotation()));
        vel.applyEuler(eulerRot);

        if (isButtonJumpPressedRef.current && !inTheAir.current && landed.current) {
            vel.y += JUMP_FORCE;
            inTheAir.current = true;
            landed.current = false;
        } else {
            vel.y = curVel.y;
        }

        if (Math.abs(vel.y) > 6) {
            inTheAir.current = true;
            landed.current = false;
        } else {
            inTheAir.current = false;
        }
        rb.current.setLinvel(vel);

        // ANIMATION
        const movement = Math.abs(vel.x) + Math.abs(vel.z);
        //         console.log(movement);
        if (inTheAir.current && vel.y > 6 && vel.y < 10) {
            setAnimationIndex(2);
        } else if (inTheAir.current && vel.y < -5) {
            setAnimationIndex(4);
        } else if (inTheAir.current) {
            setAnimationIndex(3);
        } else if (movement > 1) {
            setAnimationIndex(6);
        } else if (!landed.current) {
            setAnimationIndex(3);
        } else {
            setAnimationIndex(0);
        }
        playerPos.current = rb.current.translation();
        playerRot.current = rb.current.rotation();
        // setPlayerRot(rb.current.rotation());
        // setPlayerPos(rb.current.translation());
    });

    return (
            <RigidBody
                // position-y={startingPos.y}
                // position-z={100}
                ref={rb}
                colliders={false}
                canSleep={false}
                enabledRotations={[false, true, false]}
                onCollisionEnter={(e) => {
                    if (e.other.rigidBodyObject.name === "floor") {
                        inTheAir.current = false;
                        landed.current = true;
                        const curVel = rb.current.linvel();
                        curVel.y = 0;
                        rb.current.setLinvel(curVel);
                    }
                }}
                gravityScale={2}
                name="Guy"
            >
                <CapsuleCollider args={[0.5, 0.35]} position={[0,0.84,startingPos.z/2 + 0]} />
                {/* <CapsuleCollider args={[0.5, 0.35]} position={[startingPos.x+0,startingPos.y+ 0.84,startingPos.z - startingPos.z/2 + 0]} /> */}
                <group ref={group} {...props} dispose={null}>
                    <group name="Scene">
                        <group name="Guy" rotation={[Math.PI / 2, 0, Math.PI]} scale={0.6}>
                            <primitive object={nodes.mixamorigHips} />
                            <skinnedMesh
                                castShadow
                                name="name0"
                                geometry={nodes.name0.geometry}
                                material={nodes.name0.material}
                                skeleton={nodes.name0.skeleton}
                            />
                            <skinnedMesh
                                castShadow
                                name="name1"
                                geometry={nodes.name1.geometry}
                                material={nodes.name1.material}
                                skeleton={nodes.name1.skeleton}
                            />
                            <skinnedMesh
                                castShadow
                                name="name10"
                                geometry={nodes.name10.geometry}
                                material={nodes.name10.material}
                                skeleton={nodes.name10.skeleton}
                            />
                            <skinnedMesh
                                castShadow
                                name="name11"
                                geometry={nodes.name11.geometry}
                                material={nodes.name11.material}
                                skeleton={nodes.name11.skeleton}
                            />
                            <skinnedMesh
                                castShadow
                                name="name12"
                                geometry={nodes.name12.geometry}
                                material={nodes.name12.material}
                                skeleton={nodes.name12.skeleton}
                            />
                            <skinnedMesh
                                castShadow
                                name="name13"
                                geometry={nodes.name13.geometry}
                                material={nodes.name13.material}
                                skeleton={nodes.name13.skeleton}
                            />
                            <skinnedMesh
                                castShadow
                                name="name2"
                                geometry={nodes.name2.geometry}
                                material={nodes.name2.material}
                                skeleton={nodes.name2.skeleton}
                            />
                            <skinnedMesh
                                castShadow
                                name="name3"
                                geometry={nodes.name3.geometry}
                                material={nodes.name3.material}
                                skeleton={nodes.name3.skeleton}
                            />
                            <skinnedMesh
                                castShadow
                                name="name4"
                                geometry={nodes.name4.geometry}
                                material={nodes.name4.material}
                                skeleton={nodes.name4.skeleton}
                            />
                            <skinnedMesh
                                castShadow
                                name="name5"
                                geometry={nodes.name5.geometry}
                                material={nodes.name5.material}
                                skeleton={nodes.name5.skeleton}
                            />
                            <skinnedMesh
                                castShadow
                                name="name6"
                                geometry={nodes.name6.geometry}
                                material={nodes.name6.material}
                                skeleton={nodes.name6.skeleton}
                            />
                            <skinnedMesh
                                castShadow
                                name="name7"
                                geometry={nodes.name7.geometry}
                                material={nodes.name7.material}
                                skeleton={nodes.name7.skeleton}
                            />
                            <skinnedMesh
                                castShadow
                                name="name8"
                                geometry={nodes.name8.geometry}
                                material={nodes.name8.material}
                                skeleton={nodes.name8.skeleton}
                            />
                            <skinnedMesh
                                castShadow
                                name="name9"
                                geometry={nodes.name9.geometry}
                                material={nodes.name9.material}
                                skeleton={nodes.name9.skeleton}
                            />
                        </group>
                    </group>
                </group>
            </RigidBody>
    );
};

export default GuyGym;

useGLTF.preload(`${process.env.PUBLIC_URL}/Players/GuyJump.glb`);
