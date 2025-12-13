import { useGLTF, TransformControls } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedItem, updateDeployedItem } from '../redux/sceneSlice';
import * as THREE from 'three'

interface CommonModelProps {
  id: string
  modelPath: string
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  textureUrl?: string | null
  texturePatternSize?: number
}

export default function CommonModel({
  modelPath,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  id,
  textureUrl = null,
  texturePatternSize = 1.0
}: CommonModelProps) {
  const { scene } = useGLTF(modelPath)
  const dispatch = useDispatch();
  const selectedItemId = useSelector((state: any) => state.scene.selectedItemId)
  const transformMode = useSelector((state: any) => state.scene.transformMode);
  const ref = useRef<THREE.Object3D | null>(null)

  // Clone để mỗi instance độc lập
  const clonedScene = useMemo(() => scene.clone(true), [scene])

  // State để lưu texture
  const [texture, setTexture] = useState<THREE.Texture | null>(null)

  // Load texture khi textureUrl thay đổi
  useEffect(() => {
    if (!textureUrl) {
      setTexture(null)
      return
    }
    const loader = new THREE.TextureLoader()
    const tex = loader.load(textureUrl)
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    setTexture(tex)
  }, [textureUrl])

  // Luôn bật shadow cho mesh, kể cả khi chưa có texture
  useEffect(() => {
    clonedScene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [clonedScene])

  // Apply texture vào materials
  useEffect(() => {
    if (!texture) return
    clonedScene.traverse((child: any) => {
      if (child.isMesh) {
        child.material = child.material.clone()
        if (Array.isArray(child.material)) {
          child.material.forEach((mat: any) => {
            if ('map' in mat) {
              mat.map = texture
              mat.needsUpdate = true
            }
          })
        } else {
          child.material.map = texture
          child.material.needsUpdate = true
        }
      }
    })
  }, [clonedScene, texture])

  // Update repeat khi pattern size thay đổi
  useEffect(() => {
    if (!texture) return
    const bbox = new THREE.Box3().setFromObject(clonedScene)
    const size = new THREE.Vector3()
    bbox.getSize(size)

    // Không giới hạn repeat, cứ tính theo patternSize
    const repeatX = size.x / texturePatternSize
    const repeatY = size.y / texturePatternSize

    texture.repeat.set(repeatX, repeatY)
    texture.needsUpdate = true
  }, [clonedScene, texture, texturePatternSize])

  return (
    <>
      <primitive
        ref={ref}
        object={clonedScene}
        position={position}
        rotation={rotation}
        scale={scale}
        onClick={(e: any) => {
          e.stopPropagation();
          dispatch(setSelectedItem(id));
        }}
      />

      {selectedItemId === id && ref.current && (
        <TransformControls
          object={ref.current}
          mode={transformMode}
          onObjectChange={() => {
            const obj = ref.current!;
            dispatch(updateDeployedItem({
              id,
              position: [obj.position.x, obj.position.y, obj.position.z],
              rotation: [obj.rotation.x, obj.rotation.y, obj.rotation.z],
              scale,
              textureImage: textureUrl // 👈 lưu texture vào redux nếu cần
            }))
          }}
        />
      )}
    </>
  )
}
