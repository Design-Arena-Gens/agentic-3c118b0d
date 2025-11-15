'use client'

import { useBox } from '@react-three/cannon'
import { BlockType } from '../types'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const blockColors: Record<BlockType, string> = {
  grass: '#7CBB4A',
  dirt: '#8B4513',
  stone: '#808080',
  wood: '#CD853F',
  glass: '#E0F7FF',
}

interface CubeProps {
  id: string
  position: [number, number, number]
  type: BlockType
}

export default function Cube({ id, position, type }: CubeProps) {
  const [ref] = useBox(() => ({
    type: 'Static',
    position,
    args: [1, 1, 1],
  }))

  const meshRef = ref as React.MutableRefObject<THREE.Mesh>

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.userData.isCube = true
      meshRef.current.userData.id = id
    }
  }, [id, meshRef])

  const isTransparent = type === 'glass'

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={blockColors[type]}
        transparent={isTransparent}
        opacity={isTransparent ? 0.6 : 1}
      />
    </mesh>
  )
}
