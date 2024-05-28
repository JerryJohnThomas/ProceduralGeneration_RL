import { Canvas } from '@react-three/fiber'
import React from 'react'
import Env2 from './Env2'

function Env2_wrapper() {
  return (
    <Canvas style={{ height: "100vh" }}>
        <Env2 />
    </Canvas>
  )
}

export default Env2_wrapper