import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import SpinningCube from './SpinningCube'
import StaticCube from './StaticCube'

export default function Scene() {
  return (
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
      
      {/* 3D Objects */}
      <SpinningCube />
      <StaticCube position={[2, 0, 0]} size={1} color="#4cc9f0" />
      <StaticCube position={[-2, 0, 0]} size={0.8} color="#f72585" />
      <StaticCube position={[0, 0, -2]} size={1.2} color="#7209b7" />
      
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
  )
}