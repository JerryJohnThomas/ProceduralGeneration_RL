import React, { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import * as THREE from "three";
import { Platform } from "./Floor";

function ClickToAddPlatform() {
    const { camera, scene } = useThree();
    const floorRef = useRef(null);

    const handleClick = (event) => {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        console.log(mouse);

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObject(floorRef.current);
        console.log(intersects);

        if (intersects.length > 0) {
            const position = new Vector3().copy(intersects[0].point).add(new Vector3(0, 0.1, 0));
            const platformGeometry = new THREE.BoxGeometry(3, 0.5, 3); // Create platform geometry
            const platformMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Create platform material
            const newPlatform = new THREE.Mesh(platformGeometry, platformMaterial); // Create platform mesh
            newPlatform.position.set(position.x, position.y, position.z); // Set platform position
            const newPlatform2 = new Platform(platformGeometry, platformMaterial); // Create platform mesh
            
            scene.add(newPlatform2); // Add platform to the scene
        }
    };

    useFrame(() => {
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    });

    return (
        <mesh ref={floorRef}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#4488FF" />
        </mesh>
    );
}

export default ClickToAddPlatform;
