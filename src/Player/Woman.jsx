/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 .\\public\\Players\\woman.gltf --transform 
Files: .\\public\\Players\\woman.gltf [2.91MB] > D:\code\web\react\procedural_content_generation_adverserial_RL\pc_gen\woman-transformed.glb [600.44KB] (79%)
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

const Woman = (props)=> {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('Players/woman-transformed.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null} >
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
        </group>
        <group name="SM_Chr_Developer_Female_02" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <skinnedMesh name="Mesh019" geometry={nodes.Mesh019.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Mesh019.skeleton} />
          <skinnedMesh name="Mesh019_1" geometry={nodes.Mesh019_1.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Mesh019_1.skeleton} />
          <skinnedMesh name="Mesh019_2" geometry={nodes.Mesh019_2.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Mesh019_2.skeleton} />
          <skinnedMesh name="Mesh019_3" geometry={nodes.Mesh019_3.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Mesh019_3.skeleton} />
          <skinnedMesh name="Mesh019_4" geometry={nodes.Mesh019_4.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Mesh019_4.skeleton} />
          <skinnedMesh name="Mesh019_5" geometry={nodes.Mesh019_5.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Mesh019_5.skeleton} />
          <skinnedMesh name="Mesh019_6" geometry={nodes.Mesh019_6.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Mesh019_6.skeleton} />
          <skinnedMesh name="Mesh019_7" geometry={nodes.Mesh019_7.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Mesh019_7.skeleton} />
          <skinnedMesh name="Mesh019_8" geometry={nodes.Mesh019_8.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Mesh019_8.skeleton} />
          <skinnedMesh name="Mesh019_9" geometry={nodes.Mesh019_9.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Mesh019_9.skeleton} />
        </group>
      </group>
    </group>
  )
}
export default Woman

useGLTF.preload('Players/woman-transformed.glb')
