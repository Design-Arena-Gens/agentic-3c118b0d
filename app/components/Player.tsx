'use client'

import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { useSphere } from '@react-three/cannon'
import { Vector3 } from 'three'
import * as THREE from 'three'

const SPEED = 5
const JUMP_FORCE = 8

export default function Player() {
  const { camera } = useThree()
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 10, 0],
    args: [0.5],
  }))

  const velocity = useRef([0, 0, 0])
  const position = useRef([0, 10, 0])

  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v))
    api.position.subscribe((p) => (position.current = p))
  }, [api])

  const movement = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      switch (key) {
        case 'w':
          movement.current.forward = true
          break
        case 's':
          movement.current.backward = true
          break
        case 'a':
          movement.current.left = true
          break
        case 'd':
          movement.current.right = true
          break
        case ' ':
          movement.current.jump = true
          break
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      switch (key) {
        case 'w':
          movement.current.forward = false
          break
        case 's':
          movement.current.backward = false
          break
        case 'a':
          movement.current.left = false
          break
        case 'd':
          movement.current.right = false
          break
        case ' ':
          movement.current.jump = false
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame(() => {
    camera.position.set(position.current[0], position.current[1], position.current[2])

    const direction = new Vector3()
    const frontVector = new Vector3(
      0,
      0,
      Number(movement.current.backward) - Number(movement.current.forward)
    )
    const sideVector = new Vector3(
      Number(movement.current.left) - Number(movement.current.right),
      0,
      0
    )

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation)

    api.velocity.set(direction.x, velocity.current[1], direction.z)

    if (movement.current.jump && Math.abs(velocity.current[1]) < 0.05) {
      api.velocity.set(velocity.current[0], JUMP_FORCE, velocity.current[2])
    }
  })

  return <mesh ref={ref as any} />
}
