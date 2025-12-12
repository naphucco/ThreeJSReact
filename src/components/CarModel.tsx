import * as THREE from 'three';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame, RootState as FiberRootState } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

export default function CarModel({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 0.0001,
  playAnimation = true
}) {
  const group = useRef<THREE.Group>(null);

  const textureImage = useSelector((state: any) => state.scene.textureImage);

  const { scene, animations } = useGLTF('/models/low-poly_truck_car_drifter.glb');
  const { actions, mixer } = useAnimations(animations, group);

  useEffect(() => {
    if (!group.current || !textureImage) return;

    // Load texture từ đường dẫn
    const loader = new THREE.TextureLoader();
    const texture = loader.load(textureImage);

    group.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => {
              if ('map' in mat) {
                (mat as THREE.MeshStandardMaterial).map = texture;
                (mat as THREE.MeshStandardMaterial).needsUpdate = true;
              }
            });
          } else {
            const material = mesh.material as THREE.MeshStandardMaterial;
            material.map = texture;
            material.needsUpdate = true;
          }
        }
      }
    });
  }, [textureImage]);

  useEffect(() => {
    if (playAnimation && animations.length > 0) {
      Object.values(actions).forEach((action) => {
        action?.reset().fadeIn(0.5).play();
      });
    }
    return () => {
      Object.values(actions).forEach((action) => {
        action?.fadeOut(0.5);
      });
    };
  }, [actions, animations.length, playAnimation]);

  useFrame((state: FiberRootState, delta: number) => {
    if (mixer) mixer.update(delta);
  });

  return (
    <primitive
      ref={group}
      object={scene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
}
