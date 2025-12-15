import { useEffect, useRef, useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useSelector } from 'react-redux'

export default function CameraControls() {
  // Access the Three.js camera from the current scene
  const { camera } = useThree()
  
  // Reference to OrbitControls for direct manipulation
  const orbitRef = useRef<any>(null)
  
  // Get selected item ID from Redux store
  const selectedItemId = useSelector((state: any) => state.scene.selectedItemId)

  /**
   * Track which keys are currently pressed
   * Using a ref instead of state because:
   * 1. We need immediate access in useFrame (60fps)
   * 2. State updates would cause unnecessary re-renders
   * 3. Keyboard events are high-frequency
   */
  const keysPressed = useRef<{[key:string]:boolean}>({})

  /**
   * Effect to handle keyboard event listeners
   * Sets up global keydown/keyup listeners for camera movement
   */
  useEffect(() => {
    // Handler for keydown events
    const down = (e: KeyboardEvent) => { 
      keysPressed.current[e.key] = true 
    }
    
    // Handler for keyup events
    const up = (e: KeyboardEvent) => { 
      keysPressed.current[e.key] = false 
    }
    
    // Attach event listeners to window
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    
    // Cleanup function to remove listeners
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, []) // Empty dependency array = runs once on mount

  /**
   * useFrame is called on every animation frame (~60fps)
   * Handles continuous camera movement based on pressed keys
   */
  useFrame(() => {
    // If an item is selected, disable keyboard camera controls
    // This prevents conflict with TransformControls
    if (selectedItemId) return

    // Base movement speed
    const baseStep = 0.1
    
    // Increase speed when Shift is held (sprint mode)
    const step = keysPressed.current['Shift'] ? baseStep * 3 : baseStep

    /**
     * Calculate forward direction vector
     * 1. Get camera's world direction (where it's looking)
     * 2. Flatten to horizontal plane (set y=0)
     * 3. Normalize to unit length
     */
    const forward = new THREE.Vector3()
    camera.getWorldDirection(forward) // Gets normalized forward vector
    forward.y = 0                     // Remove vertical component
    forward.normalize()               // Ensure unit length

    /**
     * Calculate right direction vector
     * Cross product of forward and camera.up gives perpendicular right vector
     */
    const right = new THREE.Vector3()
      .crossVectors(forward, camera.up) // Cross product
      .normalize()                      // Ensure unit length

    /**
     * Helper function to move camera and its target together
     * @param dir - Direction vector to move in
     * @param dist - Distance to move
     */
    const move = (dir: THREE.Vector3, dist: number) => {
      // Move camera position
      camera.position.addScaledVector(dir, dist)
      
      // Move OrbitControls target to keep camera centered
      const target = orbitRef.current?.target as THREE.Vector3
      if (target) {
        target.addScaledVector(dir, dist)
      }
    }

    // Handle arrow key movements
    if (keysPressed.current['ArrowUp'])    move(forward, step)    // Forward
    if (keysPressed.current['ArrowDown'])  move(forward, -step)   // Backward
    if (keysPressed.current['ArrowLeft'])  move(right, -step)     // Left
    if (keysPressed.current['ArrowRight']) move(right, step)      // Right

    // Manually update OrbitControls to apply position changes
    orbitRef.current?.update()
  })

  /**
   * Effect to enable/disable OrbitControls based on selection state
   * When an item is selected, OrbitControls should be disabled
   * to allow TransformControls to work without interference
   */
  useEffect(() => {
    if (orbitRef.current) {
      // Only enable OrbitControls when no item is selected
      orbitRef.current.enabled = selectedItemId === null
    }
  }, [selectedItemId]) // Re-run when selection changes

  return (
    <OrbitControls
      ref={orbitRef} // Attach ref for direct access
      enablePan      // Allow panning with right mouse button
      enableZoom     // Allow zooming with scroll wheel
      enableRotate   // Allow rotating with left mouse button
      minDistance={5} // Minimum zoom distance
      maxDistance={20} // Maximum zoom distance
      enableDamping  // Smooth, physics-based camera movement
      dampingFactor={0.08} // Amount of smoothing (higher = more smoothing)
    />
  )
}