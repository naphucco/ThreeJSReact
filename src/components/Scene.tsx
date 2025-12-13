import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useRef } from 'react'
import { OrbitControls, Environment, Sky } from '@react-three/drei'
import SpinningCube from './SpinningCube'
import CarModel from './CarModel'
import { useDispatch, useSelector } from 'react-redux'
import { addDeployedItem, setSelectedItem } from '../redux/sceneSlice';
import CommonModel from './CommonModel'   // component load glb/gltf
import { itemOptions } from './LeftUI'
import Floor from './Floor'

export default function Scene() {
  const dispatch = useDispatch()
  const deployedItems = useSelector((state: any) => state.scene.deployedItems)
  const selectedItemId = useSelector((state: any) => state.scene.selectedItemId)
  const orbitRef = useRef<any>(null)

  function randomXZ(range: number = 10): [number, number, number] {
    const x = (Math.random() - 0.5) * 2 * range; // từ -range đến +range
    const z = (Math.random() - 0.5) * 2 * range;
    return [x, 0, z];
  }

  const handleUnselect = () => {
    dispatch(setSelectedItem(null));
  };

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

    const handleEnterSpawn = (e: any) => {
      const { itemId } = e.detail;
      spawn(itemId);
    };

    function spawn(itemId: string) {
      // tìm option theo id
      const option = itemOptions.find(opt => opt.id === itemId);
      if (!option) return; // nếu không tìm thấy thì bỏ qua

      dispatch(addDeployedItem({
        id: crypto.randomUUID(),
        type: itemId,
        model: option.modelUrl,   // 👈 lấy model từ itemOptions
        // position: randomXZ(10),
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: option.scale
      }));
    }

    canvas.addEventListener('dragover', handleDragOver)
    canvas.addEventListener('drop', handleDrop)
    window.addEventListener('spawnItem', handleEnterSpawn);

    // cleanup để không gắn nhiều lần
    return () => {
      canvas.removeEventListener('dragover', handleDragOver)
      canvas.removeEventListener('drop', handleDrop)
      window.removeEventListener('spawnItem', handleEnterSpawn);
    }
  }, [dispatch])

  // Mỗi khi selectedItemId thay đổi thì bật/tắt OrbitControls
  useEffect(() => {
    if (orbitRef.current) {
      orbitRef.current.enabled = selectedItemId === null
    }
  }, [selectedItemId])

  return (
    <Canvas shadows camera={{ position: [8, 5, 8], fov: 50 }} onPointerMissed={handleUnselect}>
      {/* Skybox */}
      <Sky
        distance={450000}
        sunPosition={[5, 1, 8]}
        inclination={0}
        azimuth={0.25}
      />
      <Suspense fallback={null}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={15.5} castShadow />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#ff7b00" />

        {/* Floor */}
        <Floor />

        {/* 3D Objects */}
        <SpinningCube />

        {/* Render các deployedItems */}
        {deployedItems.map((item: any) =>
          <CommonModel
            key={item.id}
            id={item.id}
            modelPath={item.model}
            position={item.position}
            scale={item.scale}
            textureUrl={item.textureImage}
          />
        )}

        {/* Controls */}
        <OrbitControls ref={orbitRef} enablePan enableZoom enableRotate minDistance={5} maxDistance={20} />

        {/* Environment */}
        <Environment preset="city" background={false} />

        {/* Helpers */}
        <axesHelper args={[5]} />
        <gridHelper args={[20, 20, '#444', '#222']} />
      </Suspense>
    </Canvas>
  )
}
