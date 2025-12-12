import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useRef, useState } from 'react'

export default function SpinningCube() {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5
    meshRef.current.rotation.y += delta * 0.3
  })
  
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh 
        ref={meshRef}
        scale={clicked ? 1.5 : 1}
        onClick={() => setClicked(!clicked)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color={hovered ? "orange" : "hotpink"}
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}