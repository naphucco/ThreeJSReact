import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import { OrbitControls, Environment } from '@react-three/drei'
import SpinningCube from './SpinningCube'
import CarModel from './CarModel'
import { useDispatch, useSelector } from 'react-redux'
import { addDeployedItem } from '../redux/sceneSlice';
import CommonModel from './CommonModel'   // component load glb/gltf

// https://sketchfab.com/3d-models/low-poly-truck-car-drifter-f3750246b6564607afbefc61cb1683b1" target
export default function Scene() {
  const dispatch = useDispatch()
  const deployedItems = useSelector((state: any) => state.scene.deployedItems)

  function randomXZ(range: number = 10): [number, number, number] {
    const x = (Math.random() - 0.5) * 2 * range; // từ -range đến +range
    const z = (Math.random() - 0.5) * 2 * range;
    return [x, 0, z];
  }

  useEffect(() => {
    const canvas = document.querySelector('canvas')
    if (!canvas) return

    const handleDragOver = (e: DragEvent) => e.preventDefault()

    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      const itemId = e.dataTransfer?.getData('itemId')
      if (itemId) {
        spawn(itemId);
      }
    }

    const handleSpawn = (e: any) => {
      const { itemId } = e.detail;
      spawn(itemId);
    };

    function spawn(itemId: string) {
      dispatch(addDeployedItem({
        id: crypto.randomUUID(),
        type: itemId,
        model: '/models/car.glb',
        position: randomXZ(10),
        scale: 0.005
      }));
    }

    canvas.addEventListener('dragover', handleDragOver)
    canvas.addEventListener('drop', handleDrop)
    window.addEventListener('spawnItem', handleSpawn);

    // cleanup để không gắn nhiều lần
    return () => {
      canvas.removeEventListener('dragover', handleDragOver)
      canvas.removeEventListener('drop', handleDrop)
      window.removeEventListener('spawnItem', handleSpawn);
    }
  }, [dispatch])


  return (
    <Canvas shadows camera={{ position: [8, 5, 8], fov: 50 }}>
      <Suspense fallback={null}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#ff7b00" />

        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#444" roughness={0.8} metalness={0.2} />
        </mesh>

        {/* 3D Objects */}
        <SpinningCube />

        {/* CarModel cố định */}
        <CarModel position={[-4, 0, 0]} scale={0.005} playAnimation />

        {/* Render các deployedItems */}
        {deployedItems.map((item: any) =>
          <CommonModel key={item.id} modelPath={item.model} position={item.position} scale={item.scale} />
        )}

        {/* Controls */}
        <OrbitControls enablePan enableZoom enableRotate minDistance={5} maxDistance={20} />

        {/* Environment */}
        <Environment preset="city" background={false} />

        {/* Helpers */}
        <axesHelper args={[5]} />
        <gridHelper args={[20, 20, '#444', '#222']} />
      </Suspense>
    </Canvas>
  )
}
