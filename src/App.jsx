import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Float } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'

function SpinningCube() {
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

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#1a1a2e' }}>
      <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1} 
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        
        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <shadowMaterial opacity={0.3} />
          <meshStandardMaterial color="#2d3047" />
        </mesh>
        
        {/* Multiple rotating cubes */}
        <SpinningCube />
        <mesh position={[2, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshNormalMaterial />
        </mesh>
        
        {/* Controls */}
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.5}
        />
        
        {/* Environment */}
        <Environment preset="city" />
        
        {/* Helpers */}
        <axesHelper args={[3]} />
      </Canvas>
      
      {/* UI Overlay */}
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        color: 'white',
        fontFamily: 'Arial',
        zIndex: 100
      }}>
        <h2>🎮 Cube 3D Xoay</h2>
        <p>• Click: Phóng to/thu nhỏ</p>
        <p>• Di chuột: Đổi màu</p>
        <p>• Kéo: Xoay camera</p>
        <p>• Scroll: Zoom</p>
      </div>
    </div>
  )
}

export default App