'use client'

import { usePlane } from '@react-three/cannon'
import { TextureLoader, RepeatWrapping } from 'three'
import { useLoader } from '@react-three/fiber'

export default function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0],
    type: 'Static',
  }))

  return (
    <mesh ref={ref as any} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#7CBB4A" />
    </mesh>
  )
}
