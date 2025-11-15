'use client'

import { Canvas } from '@react-three/fiber'
import { Sky, PointerLockControls } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { Suspense, useState } from 'react'
import Player from './Player'
import Ground from './Ground'
import Cubes from './Cubes'
import { BlockType } from '../types'

export default function Game() {
  const [activeBlock, setActiveBlock] = useState<BlockType>('grass')

  const blockTypes: { type: BlockType; color: string }[] = [
    { type: 'grass', color: '#7CBB4A' },
    { type: 'dirt', color: '#8B4513' },
    { type: 'stone', color: '#808080' },
    { type: 'wood', color: '#CD853F' },
    { type: 'glass', color: '#E0F7FF' },
  ]

  return (
    <>
      <div className="toolbar">
        {blockTypes.map(({ type, color }) => (
          <button
            key={type}
            className={`block-button ${activeBlock === type ? 'active' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => setActiveBlock(type)}
          />
        ))}
      </div>

      <div className="crosshair" />

      <div className="controls">
        <div className="controls-title">Управление</div>
        <div className="controls-list">
          <div>WASD - Движение</div>
          <div>Пробел - Прыжок</div>
          <div>ЛКМ - Удалить блок</div>
          <div>ПКМ - Поставить блок</div>
          <div>1-5 - Выбор блока</div>
          <div>Мышь - Обзор</div>
        </div>
      </div>

      <Canvas camera={{ fov: 60 }}>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[50, 50, 25]} intensity={0.8} castShadow />
        <Suspense fallback={null}>
          <Physics gravity={[0, -20, 0]}>
            <Player />
            <Ground />
            <Cubes activeBlock={activeBlock} />
          </Physics>
        </Suspense>
        <PointerLockControls />
      </Canvas>
    </>
  )
}
