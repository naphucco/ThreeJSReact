export default function StaticCube({ position = [0, 0, 0], size = 1, color = '#ffffff' }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}