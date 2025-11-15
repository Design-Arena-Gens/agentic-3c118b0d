'use client'

import { createContext, useContext } from 'react'
import { Physics as CannonPhysics } from '@react-three/cannon'

export { usePlane, useBox, useSphere } from '@react-three/cannon'

export function Physics({ children }: { children: React.ReactNode }) {
  return (
    <CannonPhysics gravity={[0, -20, 0]}>
      {children}
    </CannonPhysics>
  )
}
