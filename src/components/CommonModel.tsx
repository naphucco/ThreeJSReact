import { useGLTF, TransformControls } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedItem, updateDeployedItem } from '../redux/sceneSlice';
import * as THREE from 'three'

interface CommonModelProps {
  id: string
  modelPath: string
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}

export default function CommonModel({
  modelPath,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  id
}: CommonModelProps) {
  const { scene } = useGLTF(modelPath)
  const dispatch = useDispatch();
  const selectedItemId = useSelector((state: any) => state.scene.selectedItemId)
  const transformMode = useSelector((state:any) => state.scene.transformMode);
  const ref = useRef<THREE.Object3D | null>(null)

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
    <>
      {/* Luôn render primitive với onClick */}
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

      {/* Nếu đang được chọn thì render TransformControls song song */}
      {selectedItemId === id && ref.current && (
        <TransformControls
          object={ref.current}
          mode={transformMode}   // 👈 dùng mode từ Redux
          onObjectChange={() => {
            const obj = ref.current!;
            dispatch(updateDeployedItem({
              id,
              position: [obj.position.x, obj.position.y, obj.position.z],
              rotation: [obj.rotation.x, obj.rotation.y, obj.rotation.z],
              scale
            }))
          }}
        />
      )}
    </>
  )
}
