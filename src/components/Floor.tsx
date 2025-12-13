import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

function Floor() {
  // load texture cỏ
  const grassTexture = useLoader(THREE.TextureLoader, '/textures/Ground_grass.jpg')
  // lặp texture để phủ kín mặt phẳng
  grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping
  grassTexture.repeat.set(10, 10)

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[30, 30]} />
      <meshStandardMaterial
        map={grassTexture}
        color="#888"
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  )
}

export default Floor;

