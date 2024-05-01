import React, { useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
const PlatformAdder_color1 = "#17B169";
const PlatformAdder_color2 = "#7FFF00";
function PlatformAdder({mouse, keys}) {
    const { camera, scene } = useThree();
    useEffect(() => {
        const handleKeyDown = (event) => {
            console.log(event);
          if (event.key === 'p' || event.key === 'P') {
            let delta = 0.01;
            // Generate random position within a range
            const range = 20;
            const randomX = Math.random() * range - range / 2;
            const randomZ = Math.random() * range - range / 2;
            const randomPosition = [randomX + delta, 0 +delta, randomZ +delta];
            addPlatform(scene,randomPosition);
          }
        };
    
        const handleMouseDown = (event) => {
          if (event.button === 0) { // Left mouse button
            let delta = 0.01;
            // Generate random position within a range
            const range = 20;
            const randomX = Math.random() * range - range / 2;
            const randomZ = Math.random() * range - range / 2;
            const randomPosition = [randomX + delta, 0 +delta, randomZ +delta];
            addPlatform(scene,randomPosition);
          }
        };
    
        if (keys) {
          document.addEventListener('keydown', handleKeyDown);
        }
    
        if (mouse) {
          document.addEventListener('mousedown', handleMouseDown);
        }
    
        return () => {
          if (keys) {
            document.removeEventListener('keydown', handleKeyDown);
          }
          if (mouse) {
            document.removeEventListener('mousedown', handleMouseDown);
          }
        };
      }, []);

    const addPlatform = (scene, randomPosition) => {

        // Create a new platform mesh
        const platformGeometry = new THREE.BoxGeometry(3, 0.5, 3);
        const platformMaterial = new THREE.MeshStandardMaterial({ color: PlatformAdder_color2 });
        const newPlatform = new THREE.Mesh(platformGeometry, platformMaterial);
        newPlatform.position.set(randomPosition[0], randomPosition[1], randomPosition[2]);

        // Add the new platform mesh to the scene
        scene.add(newPlatform);
    };

    return (
        <Text color="gray" fontSize={0.3} position={[0, 5, -10]} textAlign="center">
            Press 'P'or Click to add a platform somwhere
        </Text>
    );
}

export default PlatformAdder;
