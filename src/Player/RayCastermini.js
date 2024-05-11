import * as THREE from "three";
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Plane, PerspectiveCamera } from "@react-three/drei";
import { useMemo } from "react";

const CubeWithRay = () => {
    const cubeRef = useRef();
    const otherCubeRef = useRef();
    const raycaster = new THREE.Raycaster();
    const direction = new THREE.Vector3(0, 0, -1); // Direction of the ray (in this case, straight ahead)
    const [intersected, setIntersected] = useState(false);
    const [rotationSpeed, setRotationSpeed] = useState(0);
    const { camera, scene } = useThree();

    // Inside your component
    const raycasterLine = useMemo(() => {
        const points = [new THREE.Vector3(0, 0, -5), new THREE.Vector3(0, 0, -10)]; // Update the points to represent the direction of the ray
        const raycasterGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const raycasterMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 }); // Set the color of the raycaster line
        return new THREE.Line(raycasterGeometry, raycasterMaterial);
    }, []);

    useEffect(() => {
        // Add the raycasterLine to the scene when the component mounts
        scene.add(raycasterLine);

        // Remove the raycasterLine from the scene when the component unmounts
        return () => {
            scene.remove(raycasterLine);
        };
    }, [raycasterLine, scene]); // Make sure to include raycasterLine and scene as dependencies

    // Event listeners for keydown and keyup events to handle rotation
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "a") {
                setRotationSpeed(0.01); // Rotate counter-clockwise when 'A' key is pressed
            } else if (event.key === "d") {
                setRotationSpeed(-0.01); // Rotate clockwise when 'D' key is pressed
            }
        };

        const handleKeyUp = (event) => {
            if (event.key === "a" || event.key === "d") {
                setRotationSpeed(0); // Stop rotation when 'A' or 'D' key is released
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    useFrame(() => {
        // Rotate the cube based on the rotation speed
        cubeRef.current.rotation.y += rotationSpeed;
        console.log(cubeRef.current.parent);
        // Check if the cube's parent and grandparent exist
        if (cubeRef.current.parent && cubeRef.current.parent) {
            // Update the raycaster's position and direction
            // raycaster.setFromCamera(new THREE.Vector2(0, 0), cubeRef.current.parent.parent.children[0]);
            const cubePosition = cubeRef.current.position;
            const cubeDirection = direction.clone().applyQuaternion(cubeRef.current.quaternion);
            raycaster.ray.origin.copy(cubePosition);
            raycaster.ray.direction.copy(cubeDirection);

            // Cast the ray and determine if it intersects with the other cube
            const intersects = raycaster.intersectObjects([otherCubeRef.current]);
            console.log(intersects);
            setIntersected(intersects.length > 0);

            // Update the raycaster line's points
            const raycasterLinePoints = raycasterLine.geometry.attributes.position.array;
            raycasterLinePoints[3] = intersects.length > 0 ? intersects[0].point.x : cubePosition.x + cubeDirection.x * 5;
            raycasterLinePoints[4] = intersects.length > 0 ? intersects[0].point.y : cubePosition.y + cubeDirection.y * 5;
            raycasterLinePoints[5] = intersects.length > 0 ? intersects[0].point.z : cubePosition.z + cubeDirection.z * 5;
            raycasterLine.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <>
            {/* Cube being tested for intersection */}
            <mesh ref={cubeRef} position={[0, 0, -5]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial color={intersected ? "green" : "red"} />
            </mesh>

            {/* Other cube */}
            <mesh ref={otherCubeRef} position={[0, 0, -10]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial color="blue" />
            </mesh>
        </>
    );
};

const RayCastermini = () => {
    return (
        <Canvas style={{ height: "100vh" }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <CubeWithRay />
            <OrbitControls />
        </Canvas>
    );
};

export default RayCastermini;
