// CarModel.jsx - SỬA LẠI IMPORTS
import { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'  // ← THÊM DÒNG NÀY

export default function CarModel({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 0.0001,
  playAnimation = true
}) {
  const group = useRef()
  
  // Load model và animations
  const { scene, animations } = useGLTF('/models/low-poly_truck_car_drifter.glb')
  const { actions, mixer } = useAnimations(animations, group)
  
  // Play animation
  useEffect(() => {
    if (playAnimation && animations.length > 0) {
      console.log(`Found ${animations.length} animation(s)`)
      
      // Chạy tất cả animations
      Object.values(actions).forEach(action => {
        if (action) {
          action.reset().fadeIn(0.5).play()
        }
      })
    }
    
    return () => {
      Object.values(actions).forEach(action => {
        if (action) {
          action.fadeOut(0.5)
        }
      })
    }
  }, [actions, animations.length, playAnimation])
  
  // Update animation loop - DÙNG useFrame ĐÚNG CÁCH
  useFrame((state, delta) => {
    if (mixer) {
      mixer.update(delta)
    }
  })
  
  return (
    <primitive
      ref={group}
      object={scene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  )
}