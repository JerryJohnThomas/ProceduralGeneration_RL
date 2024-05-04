/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 .\\public\\Players\\Guy\\Guy.glb 
*/

import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

const Guy = (props) => {
  const group = useRef()
  // const { nodes, materials, animations } = useGLTF(`${process.env.PUBLIC_URL}/Players/Guy.glb`)
  const { nodes, materials, animations } = useGLTF(`${process.env.PUBLIC_URL}/Players/WhiteGuy-transformed.glb`)
  const { actions, names } = useAnimations(animations, group)
  // names
  // 0-"breathe"
  // 1-"dancingAnim"
  // 2-"jumpingAnim"
  // 3-"runningAnim"

  useEffect(()=>{
    actions[names[3]].reset().fadeIn(0.5).play();
  },[])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Guy" rotation={[Math.PI / 2, 0, 0]} scale={0.6}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh castShadow name="name0" geometry={nodes.name0.geometry} material={nodes.name0.material} skeleton={nodes.name0.skeleton} />
          <skinnedMesh castShadow name="name1" geometry={nodes.name1.geometry} material={nodes.name1.material} skeleton={nodes.name1.skeleton} />
          <skinnedMesh castShadow name="name10" geometry={nodes.name10.geometry} material={nodes.name10.material} skeleton={nodes.name10.skeleton} />
          <skinnedMesh castShadow name="name11" geometry={nodes.name11.geometry} material={nodes.name11.material} skeleton={nodes.name11.skeleton} />
          <skinnedMesh castShadow name="name12" geometry={nodes.name12.geometry} material={nodes.name12.material} skeleton={nodes.name12.skeleton} />
          <skinnedMesh castShadow name="name13" geometry={nodes.name13.geometry} material={nodes.name13.material} skeleton={nodes.name13.skeleton} />
          <skinnedMesh castShadow name="name2" geometry={nodes.name2.geometry} material={nodes.name2.material} skeleton={nodes.name2.skeleton} />
          <skinnedMesh castShadow name="name3" geometry={nodes.name3.geometry} material={nodes.name3.material} skeleton={nodes.name3.skeleton} />
          <skinnedMesh castShadow name="name4" geometry={nodes.name4.geometry} material={nodes.name4.material} skeleton={nodes.name4.skeleton} />
          <skinnedMesh castShadow name="name5" geometry={nodes.name5.geometry} material={nodes.name5.material} skeleton={nodes.name5.skeleton} />
          <skinnedMesh castShadow name="name6" geometry={nodes.name6.geometry} material={nodes.name6.material} skeleton={nodes.name6.skeleton} />
          <skinnedMesh castShadow name="name7" geometry={nodes.name7.geometry} material={nodes.name7.material} skeleton={nodes.name7.skeleton} />
          <skinnedMesh castShadow name="name8" geometry={nodes.name8.geometry} material={nodes.name8.material} skeleton={nodes.name8.skeleton} />
          <skinnedMesh castShadow name="name9" geometry={nodes.name9.geometry} material={nodes.name9.material} skeleton={nodes.name9.skeleton} />
        </group>
      </group>
    </group>
  )
}

export default Guy;

useGLTF.preload(`${process.env.PUBLIC_URL}/Players/WhiteGuy-transformed.glb`)
