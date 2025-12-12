import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'

interface CommonModelProps {
  modelPath: string
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}

export default function CommonModel({
  modelPath,
  position = [0,0,0],
  rotation = [0,0,0],
  scale = 1
}: CommonModelProps) {
  const { scene } = useGLTF(modelPath)

  // Clone để mỗi instance độc lập
  const clonedScene = useMemo(() => scene.clone(true), [scene])

  // Bật shadow cho tất cả mesh
  useMemo(() => {
    clonedScene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        child.material.side = THREE.DoubleSide
      }
    })
  }, [clonedScene])

  return (
    <primitive
      object={clonedScene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  )
}
