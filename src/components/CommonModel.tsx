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
  textureUrl?: string | null   // 👈 thêm
}

export default function CommonModel({
  modelPath,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  id,
  textureUrl = null
}: CommonModelProps) {
  const { scene } = useGLTF(modelPath)
  const dispatch = useDispatch();
  const selectedItemId = useSelector((state: any) => state.scene.selectedItemId)
  const transformMode = useSelector((state: any) => state.scene.transformMode);
  const ref = useRef<THREE.Object3D | null>(null)

  // Clone để mỗi instance độc lập
  const clonedScene = useMemo(() => scene.clone(true), [scene])

  // Bật shadow + gán texture nếu có
  useMemo(() => {
    clonedScene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material.side = THREE.DoubleSide;

        // clone material để không share giữa các instance
        child.material = child.material.clone();

        if (textureUrl) {
          const textureLoader = new THREE.TextureLoader();
          const texture = textureLoader.load(textureUrl);
          if (Array.isArray(child.material)) {
            child.material.forEach((mat: any) => {
              if ('map' in mat) {
                mat.map = texture;
                mat.needsUpdate = true;
              }
            });
          } else {
            child.material.map = texture;
            child.material.needsUpdate = true;
          }
        }
      }
    });
  }, [clonedScene, textureUrl]);


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
