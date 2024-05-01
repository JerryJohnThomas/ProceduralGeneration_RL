import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Plane } from "@react-three/drei";
import * as THREE from "three";

const thickness = 0.5; // Thickness of the checker platform

export function Floor() {
    return (
        <Plane args={[20, 20, 10, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} drawDiagonals={false}>
            <meshBasicMaterial color={0xeeeeee} wireframe />
        </Plane>
    );
}
export function FloorUgly() {
    return (
        <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <meshBasicMaterial color={0xeeeeee} /> {/* Light gray color */}
        </Plane>
    );
}
export function FloorWithSquares() {
    const gridSize = 10;
    const squareSize = 2;
    const squares = [];

    // Create wireframe squares without diagonals
    for (let x = -gridSize / 2; x < gridSize / 2; x++) {
        for (let z = -gridSize / 2; z < gridSize / 2; z++) {
            const squareGeometry = new THREE.BufferGeometry();
            const vertices = new Float32Array([
                -squareSize / 2,
                0,
                -squareSize / 2,
                squareSize / 2,
                0,
                -squareSize / 2,
                squareSize / 2,
                0,
                squareSize / 2,
                -squareSize / 2,
                0,
                squareSize / 2,
                -squareSize / 2,
                0,
                -squareSize / 2, // close the square
            ]);
            squareGeometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

            const indices = new Uint32Array([0, 1, 1, 2, 2, 3, 3, 0]);
            squareGeometry.setIndex(new THREE.BufferAttribute(indices, 1));

            const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xeeeeee });
            const square = (
                <lineSegments
                    geometry={squareGeometry}
                    material={wireframeMaterial}
                    position={[x * squareSize, -1, z * squareSize]}
                    rotation={[0, 0, 0]}
                    key={`${x}-${z}`}
                />
            );
            squares.push(square);
        }
    }

    return <>{squares}</>;
}

export function Platform(props) {
    const { color, size, position } = props;
    const [width, _,height] = size;

    return (
        <mesh position={position} receiveShadow>
            <boxGeometry args={[width, thickness, height]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
}

export function Light_Common() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[1, 1, 0]} intensity={0.5} />
        </>
    );
}

export function CheckerPlatform() {
    const checkerSize = 0.5; // Size of each checker tile
    const numCheckers = 6; // Number of checker tiles in each row and column
    // const thickness = 0.2; // Thickness of the checker platform
    const positionBuffer = 2;
    const checkers = [];

    for (let i = 0; i < numCheckers; i++) {
        for (let j = 0; j < numCheckers; j++) {
            const color = (i + j) % 2 === 0 ? "#000000" : "#FFFFFF"; // Alternate between black and white
            const position = [
                (i - (numCheckers - 1) / 2) * checkerSize, // Calculate x position
                -thickness / 2 + positionBuffer, // Y position (half of thickness)
                (j - (numCheckers - 1) / 2) * checkerSize, // Calculate z position
            ];

            const checker = (
                <mesh key={`${i}-${j}`} position={position}>
                    <boxGeometry args={[checkerSize, thickness, checkerSize]} />
                    <meshStandardMaterial color={color} />
                </mesh>
            );

            checkers.push(checker);
        }
    }

    return <group receiveShadow>{checkers}</group>;
}
