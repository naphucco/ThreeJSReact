import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { OrbitControls, Environment, Html } from '@react-three/drei'
import SpinningCube from './SpinningCube'
import CarModel from './CarModel'

export default function Scene() {
  return (
    <Canvas shadows camera={{ position: [8, 5, 8], fov: 50 }}>
      <Suspense fallback={null}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.5} 
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#ff7b00" />
        
        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <shadowMaterial opacity={0.2} />
          <meshStandardMaterial color="#444" roughness={0.8} metalness={0.2} />
        </mesh>
        
        {/* Road lines (optional) */}
        {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <planeGeometry args={[20, 2]} />
          <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={0.3} />
        </mesh> */}
        
        {/* 3D Objects */}
        <SpinningCube />
        
        {/* Car Models */}
        <CarModel 
          position={[-4, 0, 0]} 
          scale={0.005}
          playAnimation={true}
        />
        
        {/* Simple cubes for reference */}
        {/* <mesh position={[0, 0.5, 4]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#ff00ff" />
        </mesh> */}
        
        {/* Controls */}
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={false}
          minDistance={5}
          maxDistance={20}
        />
        
        {/* Environment */}
        <Environment 
          preset="city"
          background={false}
        />
        
        {/* Helpers */}
        <axesHelper args={[5]} />
        <gridHelper args={[20, 20, '#444', '#222']} />
      </Suspense>
    </Canvas>
  )
}