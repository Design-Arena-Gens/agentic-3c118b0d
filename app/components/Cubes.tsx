'use client'

import { useState, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import Cube from './Cube'
import { BlockType } from '../types'
import * as THREE from 'three'

interface CubeData {
  id: string
  position: [number, number, number]
  type: BlockType
}

export default function Cubes({ activeBlock }: { activeBlock: BlockType }) {
  const { camera, scene } = useThree()
  const [cubes, setCubes] = useState<CubeData[]>([])

  useEffect(() => {
    // Create initial structure
    const initialCubes: CubeData[] = []
    for (let x = -3; x <= 3; x++) {
      for (let z = -3; z <= 3; z++) {
        if (Math.random() > 0.7) {
          initialCubes.push({
            id: `${x}-0-${z}`,
            position: [x, 0.5, z],
            type: 'grass',
          })
        }
      }
    }
    setCubes(initialCubes)
  }, [])

  useEffect(() => {
    const raycaster = new THREE.Raycaster()
    raycaster.far = 10

    const handleClick = (e: MouseEvent) => {
      if (document.pointerLockElement === null) return

      const mouse = new THREE.Vector2()
      mouse.x = 0
      mouse.y = 0

      raycaster.setFromCamera(mouse, camera)

      const objects = scene.children.filter(
        (obj) => obj.userData.isCube
      )

      const intersects = raycaster.intersectObjects(objects)

      if (intersects.length > 0) {
        const intersect = intersects[0]
        const clickedObject = intersect.object

        if (e.button === 0) {
          // Left click - remove cube
          setCubes((prev) =>
            prev.filter((cube) => cube.id !== clickedObject.userData.id)
          )
        } else if (e.button === 2) {
          // Right click - add cube
          const normal = intersect.face?.normal
          if (normal) {
            const newPosition = intersect.point
              .clone()
              .add(normal.clone().multiplyScalar(0.5))

            const x = Math.round(newPosition.x)
            const y = Math.round(newPosition.y)
            const z = Math.round(newPosition.z)

            const newCube: CubeData = {
              id: `${x}-${y}-${z}-${Date.now()}`,
              position: [x, y, z],
              type: activeBlock,
            }

            setCubes((prev) => [...prev, newCube])
          }
        }
      }
    }

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }

    window.addEventListener('click', handleClick)
    window.addEventListener('contextmenu', handleContextMenu)
    window.addEventListener('mousedown', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
      window.removeEventListener('contextmenu', handleContextMenu)
      window.removeEventListener('mousedown', handleClick)
    }
  }, [camera, scene, activeBlock])

  // Handle keyboard block selection
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key
      // This is handled in the parent component
    }

    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [])

  return (
    <>
      {cubes.map((cube) => (
        <Cube key={cube.id} id={cube.id} position={cube.position} type={cube.type} />
      ))}
    </>
  )
}
