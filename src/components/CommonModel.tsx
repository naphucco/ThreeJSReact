import { useGLTF, TransformControls } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedItem, updateDeployedItem } from '../redux/sceneSlice';
import * as THREE from 'three'

interface CommonModelProps {
  id: string                    // Unique identifier for this model instance
  modelPath: string             // Path/URL to the 3D model file (GLB/GLTF)
  position?: [number, number, number] // 3D position [x, y, z]
  rotation?: [number, number, number] // Rotation [x, y, z] in radians
  scale?: number                // Uniform scale factor
  textureUrl?: string | null    // Optional texture image URL
  texturePatternSize?: number   // Texture tiling/repetition factor
}

export default function CommonModel({
  modelPath,
  position = [0, 0, 0],        // Default position at origin
  rotation = [0, 0, 0],        // Default rotation (no rotation)
  scale = 1,                   // Default scale (original size)
  id,                          // Required prop - unique ID
  textureUrl = null,           // Optional texture
  texturePatternSize = 1.0     // Default pattern size
}: CommonModelProps) {
  // Load the 3D model file using useGLTF hook
  const { scene } = useGLTF(modelPath)
  
  // Redux dispatch function for state updates
  const dispatch = useDispatch();
  
  // Get selected item ID and transform mode from Redux store
  const selectedItemId = useSelector((state: any) => state.scene.selectedItemId)
  const transformMode = useSelector((state: any) => state.scene.transformMode);
  
  // Reference to the THREE.Object3D for TransformControls
  const ref = useRef<THREE.Object3D | null>(null)

  /**
   * Clone the loaded scene to ensure each instance is independent
   * Without cloning, multiple instances would share the same geometry and materials
   * useMemo prevents unnecessary re-cloning on every render
   */
  const clonedScene = useMemo(() => scene.clone(true), [scene])

  // State to store the loaded texture
  const [texture, setTexture] = useState<THREE.Texture | null>(null)

  /**
   * Effect to load texture when textureUrl changes
   * Uses THREE.TextureLoader to load image as texture
   */
  useEffect(() => {
    if (!textureUrl) {
      setTexture(null) // Clear texture if URL is null
      return
    }
    
    const loader = new THREE.TextureLoader()
    const tex = loader.load(textureUrl)
    
    // Set texture wrapping to Repeat for tiling support
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    
    setTexture(tex) // Update state with loaded texture
  }, [textureUrl])

  /**
   * Effect to enable shadows for all meshes in the scene
   * Traverses the scene graph and sets shadow properties
   * Runs once after scene is cloned
   */
  useEffect(() => {
    clonedScene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true    // Mesh can cast shadows
        child.receiveShadow = true // Mesh can receive shadows
      }
    })
  }, [clonedScene])

  /**
   * Effect to apply texture to all materials in the scene
   * Clones materials to avoid sharing between instances
   * Handles both single materials and material arrays
   */
  useEffect(() => {
    if (!texture) return // Exit if no texture
    
    clonedScene.traverse((child: any) => {
      if (child.isMesh) {
        // Clone material to avoid affecting other instances
        child.material = child.material.clone()
        
        if (Array.isArray(child.material)) {
          // Handle material arrays (multi-material objects)
          child.material.forEach((mat: any) => {
            if ('map' in mat) {
              mat.map = texture      // Apply texture
              mat.needsUpdate = true // Flag for Three.js to update
            }
          })
        } else {
          // Handle single material objects
          child.material.map = texture
          child.material.needsUpdate = true
        }
      }
    })
  }, [clonedScene, texture])

  /**
   * Effect to update texture tiling/repeat based on pattern size
   * Calculates repeat values based on object size and pattern size
   * Creates a consistent texture scale regardless of object size
   */
  useEffect(() => {
    if (!texture) return
    
    // Calculate bounding box to get object dimensions
    const bbox = new THREE.Box3().setFromObject(clonedScene)
    const size = new THREE.Vector3()
    bbox.getSize(size)

    /**
     * Calculate texture repeat values:
     * - Larger patternSize = smaller repeat (less tiling)
     * - Smaller patternSize = larger repeat (more tiling)
     * Example: patternSize=2 → half the tiling of patternSize=1
     */
    const repeatX = size.x / texturePatternSize
    const repeatY = size.y / texturePatternSize

    // Apply repeat values to texture
    texture.repeat.set(repeatX, repeatY)
    texture.needsUpdate = true // Flag texture for update
  }, [clonedScene, texture, texturePatternSize])

  return (
    <>
      {/* Main 3D object primitive */}
      <primitive
        ref={ref} // Attach ref for TransformControls access
        object={clonedScene} // The cloned Three.js scene/object
        position={position} // Position prop
        rotation={rotation} // Rotation prop
        scale={scale} // Scale prop
        onClick={(e: any) => {
          e.stopPropagation(); // Prevent event from bubbling to canvas
          dispatch(setSelectedItem(id)); // Select this item in Redux
        }}
      />

      {/* Conditionally render TransformControls when this item is selected */}
      {selectedItemId === id && ref.current && (
        <TransformControls
          object={ref.current} // Object to transform
          mode={transformMode} // Current mode: translate/rotate/scale
          onObjectChange={() => {
            // Called whenever transformation changes
            const obj = ref.current!; // Non-null assertion (we know it exists)
            
            // Dispatch update with new position/rotation
            dispatch(updateDeployedItem({
              id,
              position: [obj.position.x, obj.position.y, obj.position.z],
              rotation: [obj.rotation.x, obj.rotation.y, obj.rotation.z],
              scale, // Note: Scale from TransformControls not captured here
              textureImage: textureUrl // Preserve texture URL
            }))
          }}
        />
      )}
    </>
  )
}