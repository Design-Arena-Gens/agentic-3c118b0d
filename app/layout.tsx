import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Minecraft Clone',
  description: 'A 3D voxel-based Minecraft clone built with Three.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
