import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useRef } from 'react'
import { OrbitControls, Environment, Sky } from '@react-three/drei'
import { useDispatch, useSelector } from 'react-redux'
import { addDeployedItem, setSelectedItem } from '../redux/sceneSlice';
import CommonModel from './CommonModel'   // Component to load glb/gltf models
import Floor from './Floor'
import { itemOptions } from '../configs/itemOptions'
import CameraControls from './CameraControls'

export default function Scene() {
  // Get Redux dispatch function to send actions
  const dispatch = useDispatch()
  
  // Get all deployed items from Redux store state
  const deployedItems = useSelector((state: any) => state.scene.deployedItems)
  
  // Helper function to generate random XZ coordinates
  // Returns: [x, 0, z] where x and z are within ±range
  function randomXZ(range: number = 10): [number, number, number] {
    const x = (Math.random() - 0.5) * 2 * range; // Random value from -range to +range
    const z = (Math.random() - 0.5) * 2 * range;
    return [x, 0, z]; // Y is always 0 (ground level)
  }

  // Handler to clear item selection when clicking on empty space
  const handleUnselect = () => {
    dispatch(setSelectedItem(null));
  };

  // Effect to handle drag-and-drop and custom event spawning
  useEffect(() => {
    const canvas = document.querySelector('canvas')
    if (!canvas) return // Exit if canvas not found

    // Prevent default to allow drop
    const handleDragOver = (e: DragEvent) => e.preventDefault()

    // Handle drop event from UI drag-and-drop
    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      const itemId = e.dataTransfer?.getData('itemId')
      if (itemId) {
        spawn(itemId); // Spawn the dropped item
      }
    }

    // Handle custom 'spawnItem' event
    const handleEnterSpawn = (e: any) => {
      const { itemId } = e.detail;
      spawn(itemId);
    };

    // Function to create and add a new item to the scene
    function spawn(itemId: string) {
      // Find item configuration from predefined options
      const option = itemOptions.find(opt => opt.id === itemId);
      if (!option) return; // Exit if item not found in options

      // Dispatch action to add new item to Redux store
      dispatch(addDeployedItem({
        id: crypto.randomUUID(), // Generate unique ID
        type: itemId, // Item type identifier
        model: option.modelUrl, // 3D model URL from configuration
        // position: randomXZ(10), // Alternative: random position
        position: [0, 0, 0], // Spawn at origin
        rotation: [0, 0, 0], // Default rotation
        scale: option.scale // Scale from configuration
      }));
    }

    // Attach event listeners
    canvas.addEventListener('dragover', handleDragOver)
    canvas.addEventListener('drop', handleDrop)
    window.addEventListener('spawnItem', handleEnterSpawn);

    // Cleanup: remove event listeners when component unmounts
    return () => {
      canvas.removeEventListener('dragover', handleDragOver)
      canvas.removeEventListener('drop', handleDrop)
      window.removeEventListener('spawnItem', handleEnterSpawn);
    }
  }, [dispatch]) // Effect depends on dispatch

  

  return (
    // Main Three.js Canvas component
    <Canvas 
      shadows // Enable shadow rendering
      camera={{ position: [8, 5, 8], fov: 50 }} // Camera initial position and field of view
      onPointerMissed={handleUnselect} // Clear selection when clicking empty space
    >
      {/* Skybox for outdoor environment */}
      <Sky
        distance={450000} // Render distance
        sunPosition={[5, 1, 8]} // Sun position for lighting calculation
        inclination={0} // Sun angle
        azimuth={0.25} // Sun direction
      />
      
      {/* Suspense boundary for async loading of 3D assets */}
      <Suspense fallback={null}>
        {/* Ambient light for overall scene illumination */}
        <ambientLight intensity={0.5} />
        
        {/* Main directional light (sun-like) */}
        <directionalLight
          position={[10, 10, 5]} // Light position
          intensity={5.5} // Light strength
          shadow-bias={-0.0005} // Fix shadow artifacts (shadow acne), Disadvantage: May cause "Peter Panning".
          shadow-normalBias={0.01} // Additional shadow quality fix
          castShadow // Enable shadow casting
        />
        
        {/* Additional point light for accent lighting */}
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#ff7b00" />

        {/* Floor component */}
        <Floor />

        {/* Render all deployed items from Redux store */}
        {deployedItems.map((item: any) =>
          <CommonModel
            key={item.id} // Unique key for React rendering
            id={item.id} // Pass ID for selection handling
            modelPath={item.model} // Path to 3D model file
            position={item.position} // 3D position
            scale={item.scale} // Scale factor
            textureUrl={item.textureImage} // Optional texture URL
            texturePatternSize={item.texturePatternSize} // Optional texture tiling
          />
        )}

        {/* Custom camera controls */}
        <CameraControls />
        {/* Alternative: OrbitControls (commented out) */}
        {/* <OrbitControls ref={orbitRef} enablePan enableZoom enableRotate minDistance={5} maxDistance={20} /> */}

        {/* Environment lighting and reflections */}
        <Environment preset="city" background={false} />

        {/* Debug helpers */}
        <axesHelper args={[5]} /> // XYZ axes visualization
        <gridHelper args={[20, 20, '#444', '#222']} /> // Ground grid
      </Suspense>
    </Canvas>
  )
}