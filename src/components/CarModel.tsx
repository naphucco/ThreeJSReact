import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';

export default function CarModel({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 0.0001,
  playAnimation = true
}) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/models/car.glb');

  // Clone scene để mỗi instance độc lập
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const { actions, mixer } = useAnimations(animations, group);

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

  return (
    <primitive
      ref={group}
      object={clonedScene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
}
