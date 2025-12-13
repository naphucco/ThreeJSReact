import { useEffect, useRef, useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useSelector } from 'react-redux'

export default function CameraControls() {
  const { camera } = useThree()
  const orbitRef = useRef<any>(null)
  const selectedItemId = useSelector((state: any) => state.scene.selectedItemId)

  // Trạng thái phím đang giữ
  const keysPressed = useRef<{[key:string]:boolean}>({})

  useEffect(() => {
    const down = (e: KeyboardEvent) => { keysPressed.current[e.key] = true }
    const up = (e: KeyboardEvent) => { keysPressed.current[e.key] = false }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  useFrame(() => {
    if (selectedItemId) return

    const baseStep = 0.1
    const step = keysPressed.current['Shift'] ? baseStep * 3 : baseStep

    // Hướng nhìn (forward)
    const forward = new THREE.Vector3()
    camera.getWorldDirection(forward)
    forward.y = 0
    forward.normalize()

    // Trục ngang
    const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize()

    const move = (dir: THREE.Vector3, dist: number) => {
      camera.position.addScaledVector(dir, dist)
      const target = orbitRef.current?.target as THREE.Vector3
      if (target) target.addScaledVector(dir, dist)
    }

    if (keysPressed.current['ArrowUp']) move(forward, step)
    if (keysPressed.current['ArrowDown']) move(forward, -step)
    if (keysPressed.current['ArrowLeft']) move(right, -step)
    if (keysPressed.current['ArrowRight']) move(right, step)

    orbitRef.current?.update()
  })

  useEffect(() => {
    if (orbitRef.current) {
      orbitRef.current.enabled = selectedItemId === null
    }
  }, [selectedItemId])

  return (
    <OrbitControls
      ref={orbitRef}
      enablePan
      enableZoom
      enableRotate
      minDistance={5}
      maxDistance={20}
      enableDamping
      dampingFactor={0.08}
    />
  )
}
